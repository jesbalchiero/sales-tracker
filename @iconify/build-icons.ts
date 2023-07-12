import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'

import {
  cleanupSVG,
  importDirectory,
  isEmptyColor,
  parseColors,
  runSVGO,
} from '@iconify/tools'
import type { IconifyJSON, IconifyMetaData } from '@iconify/types'
import { getIcons, minifyIconSet, stringToIcon } from '@iconify/utils'

interface BundleScriptCustomSVGConfig {
  dir: string
  monotone: boolean
  prefix: string
}

interface BundleScriptCustomJSONConfig {
  filename: string
  icons?: string[]
}

interface BundleScriptConfig {
  svg?: BundleScriptCustomSVGConfig[]
  icons?: string[]
  json?: (string | BundleScriptCustomJSONConfig)[]
}

const sources: BundleScriptConfig = {
  svg: [
    {
      dir: 'src/assets/images/iconify-svg',
      monotone: false,
      prefix: 'custom',
    },

    // {
    //   dir: 'emojis',
    //   monotone: false,
    //   prefix: 'emoji',
    // },
  ],

  icons: [
    // 'mdi:home',
    // 'mdi:account',
    // 'mdi:login',
    // 'mdi:logout',
    // 'octicon:book-24',
    // 'octicon:code-square-24',
  ],

  json: [
    require.resolve('@iconify-json/bx/icons.json'),
    require.resolve('@iconify-json/bxs/icons.json'),
    require.resolve('@iconify-json/bxl/icons.json'),
    {
      filename: require.resolve('@iconify-json/mdi/icons.json'),
      icons: [
        'file-remove-outline',
        'translate',
        'vuetify',
        'information-variant',
        'arrow-top-right',
        'arrow-bottom-right',
        'arrow-bottom-left',
        'arrow-top-left',
        'arrow-collapse-all',
        'arrow-down-left',
        'web',
        'cpu-32-bit',
        'alpha-r',
        'alpha-g',
        'alpha-b',
        'map-marker-off-outline',
        'alpha-t-box-outline',
        'form-select',
        'account-cog-outline',
        'laptop',
      ],
    },

    // {
    //   filename: require.resolve('@iconify-json/line-md/icons.json'),
    //   icons: [
    //     'home-twotone-alt',
    //     'github',
    //     'document-list',
    //     'document-code',
    //     'image-twotone',
    //   ],
    // },
  ],
}

const component = '@iconify/vue'
const commonJS = false
const target = join(__dirname, 'icons-bundle.js');

// eslint-disable-next-line sonarjs/cognitive-complexity
(async function () {
  let bundle = commonJS
    ? `const { addCollection } = require('${component}');\n\n`
    : `import { addCollection } from '${component}';\n\n`

  const dir = dirname(target)
  try {
    await fs.mkdir(dir, {
      recursive: true,
    })
  }
  catch (err) {
  }

  if (sources.icons) {
    const sourcesJSON = sources.json ? sources.json : (sources.json = [])

    const organizedList = organizeIconsList(sources.icons)
    for (const prefix in organizedList) {
      const filename = require.resolve(`@iconify/json/json/${prefix}.json`)

      sourcesJSON.push({
        filename,
        icons: organizedList[prefix],
      })
    }
  }

  if (sources.json) {
    for (let i = 0; i < sources.json.length; i++) {
      const item = sources.json[i]

      const filename = typeof item === 'string' ? item : item.filename
      let content = JSON.parse(
        await fs.readFile(filename, 'utf8'),
      ) as IconifyJSON

      if (typeof item !== 'string' && item.icons?.length) {
        const filteredContent = getIcons(content, item.icons)
        if (!filteredContent)
          throw new Error(`Cannot find required icons in ${filename}`)

        content = filteredContent
      }

      removeMetaData(content)
      minifyIconSet(content)
      bundle += `addCollection(${JSON.stringify(content)});\n`
      console.log(`Bundled icons from ${filename}`)
    }
  }

  if (sources.svg) {
    for (let i = 0; i < sources.svg.length; i++) {
      const source = sources.svg[i]

      const iconSet = await importDirectory(source.dir, {
        prefix: source.prefix,
      })

      await iconSet.forEach(async (name, type) => {
        if (type !== 'icon')
          return

        const svg = iconSet.toSVG(name)
        if (!svg) {
          iconSet.remove(name)

          return
        }

        try {
          await cleanupSVG(svg)

          if (source.monotone) {
            await parseColors(svg, {
              defaultColor: 'currentColor',
              callback: (attr, colorStr, color) => {
                return (!color || isEmptyColor(color))
                  ? colorStr
                  : 'currentColor'
              },
            })
          }

          await runSVGO(svg)
        }
        catch (err) {
          console.error(
            `Error parsing ${name} from ${source.dir}:`,
            err,
          )
          iconSet.remove(name)

          return
        }

        iconSet.fromSVG(name, svg)
      })
      console.log(`Bundled ${iconSet.count()} icons from ${source.dir}`)

      const content = iconSet.export()

      bundle += `addCollection(${JSON.stringify(content)});\n`
    }
  }

  await fs.writeFile(target, bundle, 'utf8')

  console.log(`Saved ${target} (${bundle.length} bytes)`)
})().catch(err => {
  console.error(err)
})

function removeMetaData(iconSet: IconifyJSON) {
  const props: (keyof IconifyMetaData)[] = [
    'info',
    'chars',
    'categories',
    'themes',
    'prefixes',
    'suffixes',
  ]

  props.forEach(prop => {
    delete iconSet[prop]
  })
}

function organizeIconsList(icons: string[]): Record<string, string[]> {
  const sorted: Record<string, string[]> = Object.create(null)

  icons.forEach(icon => {
    const item = stringToIcon(icon)
    if (!item)
      return

    const prefix = item.prefix

    const prefixList = sorted[prefix]
      ? sorted[prefix]
      : (sorted[prefix] = [])

    const name = item.name
    if (!prefixList.includes(name))
      prefixList.push(name)
  })

  return sorted
}
