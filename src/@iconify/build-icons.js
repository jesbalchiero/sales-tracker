"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const tools_1 = require("@iconify/tools");
const utils_1 = require("@iconify/utils");
const sources = {
    svg: [
        {
            dir: 'src/assets/images/iconify-svg',
            monotone: false,
            prefix: 'custom',
        },
    ],
    icons: [
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
    ],
};
const component = '@iconify/vue';
const commonJS = false;
const target = (0, node_path_1.join)(__dirname, 'icons-bundle.js');
(async function () {
    let bundle = commonJS
        ? `const { addCollection } = require('${component}');\n\n`
        : `import { addCollection } from '${component}';\n\n`;
    const dir = (0, node_path_1.dirname)(target);
    try {
        await node_fs_1.promises.mkdir(dir, {
            recursive: true,
        });
    }
    catch (err) {
    }
    if (sources.icons) {
        const sourcesJSON = sources.json ? sources.json : (sources.json = []);
        const organizedList = organizeIconsList(sources.icons);

        for (const prefix in organizedList) {
            const filename = require.resolve(`@iconify/json/json/${prefix}.json`);
            sourcesJSON.push({
                filename,
                icons: organizedList[prefix],
            });
        }
    }
    if (sources.json) {
        for (let i = 0; i < sources.json.length; i++) {
            const item = sources.json[i];
            const filename = typeof item === 'string' ? item : item.filename;
            let content = JSON.parse(await node_fs_1.promises.readFile(filename, 'utf8'));

            if (typeof item !== 'string' && item.icons?.length) {
                const filteredContent = (0, utils_1.getIcons)(content, item.icons);
                if (!filteredContent)
                    throw new Error(`Cannot find required icons in ${filename}`);
                content = filteredContent;
            }

            removeMetaData(content);

            (0, utils_1.minifyIconSet)(content);
            bundle += `addCollection(${JSON.stringify(content)});\n`;
            console.log(`Bundled icons from ${filename}`);
        }
    }

    if (sources.svg) {
        for (let i = 0; i < sources.svg.length; i++) {
            const source = sources.svg[i];
            const iconSet = await (0, tools_1.importDirectory)(source.dir, {
                prefix: source.prefix,
            });
            await iconSet.forEach(async (name, type) => {
                if (type !== 'icon')
                    return;
                const svg = iconSet.toSVG(name);
                if (!svg) {
                    iconSet.remove(name);
                    return;
                }
                try {
                    await (0, tools_1.cleanupSVG)(svg);
                    if (source.monotone) {
                        await (0, tools_1.parseColors)(svg, {
                            defaultColor: 'currentColor',
                            callback: (attr, colorStr, color) => {
                                return (!color || (0, tools_1.isEmptyColor)(color))
                                    ? colorStr
                                    : 'currentColor';
                            },
                        });
                    }
                    await (0, tools_1.runSVGO)(svg);
                }
                catch (err) {
                    console.error(`Error parsing ${name} from ${source.dir}:`, err);
                    iconSet.remove(name);
                    return;
                }
                iconSet.fromSVG(name, svg);
            });
            console.log(`Bundled ${iconSet.count()} icons from ${source.dir}`);
            const content = iconSet.export();
            bundle += `addCollection(${JSON.stringify(content)});\n`;
        }
    }

    await node_fs_1.promises.writeFile(target, bundle, 'utf8');
    console.log(`Saved ${target} (${bundle.length} bytes)`);
})().catch(err => {
    console.error(err);
});

function removeMetaData(iconSet) {
    const props = [
        'info',
        'chars',
        'categories',
        'themes',
        'prefixes',
        'suffixes',
    ];
    props.forEach(prop => {
        delete iconSet[prop];
    });
}

function organizeIconsList(icons) {
    const sorted = Object.create(null);
    
    icons.forEach(icon => {
        const item = (0, utils_1.stringToIcon)(icon);

        if (!item)
            return;

        const prefix = item.prefix;
        const prefixList = sorted[prefix]
            ? sorted[prefix]
            : (sorted[prefix] = []);
        const name = item.name;

        if (!prefixList.includes(name))
            prefixList.push(name);
    });

    return sorted;
}
