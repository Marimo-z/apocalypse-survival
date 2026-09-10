export type ResourceKey = 'water' | 'fuel' | 'food' | 'shelter'
export type HazardKey = 'quake' | 'storm' | 'heat' | 'cold' | 'flood' | 'drought'
export type AtlasLayer = 'all' | ResourceKey | 'hazard'

export interface AtlasRegion {
  id: string
  code: string
  name: string
  en: string
  biome: string
  x: number
  y: number
  scores: Record<ResourceKey, number>
  hazards: HazardKey[]
  intel: string[]
  related: string[]
}

export const resourceLabels: Record<ResourceKey, string> = {
  water: '淡水',
  fuel: '燃料',
  food: '可获取食物',
  shelter: '庇护材料',
}

export const hazardLabels: Record<HazardKey, string> = {
  quake: '地震',
  storm: '风暴',
  heat: '极端高温',
  cold: '极寒',
  flood: '洪水',
  drought: '干旱',
}

export const atlasLayers: { id: AtlasLayer; label: string }[] = [
  { id: 'all', label: '全图' },
  { id: 'water', label: '淡水' },
  { id: 'fuel', label: '燃料' },
  { id: 'food', label: '食物' },
  { id: 'shelter', label: '庇护' },
  { id: 'hazard', label: '灾害带' },
]

export const atlasRegions: AtlasRegion[] = [
  {
    id: 'east-asia',
    code: 'EA-01',
    name: '东亚',
    en: 'EAST ASIA',
    biome: '温带季风 · 城市密集',
    x: 812,
    y: 168,
    scores: { water: 3, fuel: 3, food: 3, shelter: 4 },
    hazards: ['quake', 'storm', 'flood'],
    intel: [
      '淡水依赖市政管网与水库，停泵后高层余量往往只有数小时到一天。',
      '台风季同时带来风灾、内涝和停电，撤离包比荒野陷阱更值钱。',
      '环太平洋地震带：先护头颈，再查燃气，余震期不要返回开裂房屋。',
    ],
    related: ['blackout', 'earthquake', 'typhoon', 'go-bag'],
  },
  {
    id: 'se-asia',
    code: 'SE-02',
    name: '东南亚',
    en: 'S.E. ASIA',
    biome: '热带雨林 · 湿热',
    x: 798,
    y: 248,
    scores: { water: 4, fuel: 4, food: 3, shelter: 4 },
    hazards: ['flood', 'storm', 'heat'],
    intel: [
      '地表水多，但污染也多。再清的溪水也要过滤后煮沸。',
      '湿热让失温少见、中暑和感染常见。伤口按污染创口处理。',
      '植被足够做残骸屋，但暴雨会灌进低洼营地，选微高地。',
    ],
    related: ['water-purify', 'hygiene', 'shelter', 'heat-cold'],
  },
  {
    id: 'south-asia',
    code: 'SA-03',
    name: '南亚',
    en: 'SOUTH ASIA',
    biome: '季风平原 · 热季漫长',
    x: 728,
    y: 210,
    scores: { water: 2, fuel: 2, food: 3, shelter: 3 },
    hazards: ['heat', 'flood', 'drought'],
    intel: [
      '旱季与热浪把水的定额上调。中午移动等于主动中暑。',
      '季风期洪水来得快，向高处走，不蹚、不开车硬闯积水。',
      '燃料在城市外围可能紧张，煮水优先于热餐。',
    ],
    related: ['heat', 'flood', 'water-store', 'heat-cold'],
  },
  {
    id: 'central-asia',
    code: 'CA-04',
    name: '中亚内陆',
    en: 'INNER ASIA',
    biome: '干旱草原 · 昼夜温差大',
    x: 690,
    y: 140,
    scores: { water: 2, fuel: 2, food: 2, shelter: 3 },
    hazards: ['cold', 'drought', 'heat'],
    intel: [
      '水是硬约束。遇到水源先处理再离开视线。',
      '白天防晒、夜里挡风隔地。温差会把汗湿的衣服变成失温。',
      '植被稀疏，燃料要省着为煮水，不要为了照明烧光。',
    ],
    related: ['water-store', 'shelter', 'firecraft', 'cold'],
  },
  {
    id: 'middle-east',
    code: 'ME-05',
    name: '中东与北非',
    en: 'MENA',
    biome: '沙漠与干旱海岸',
    x: 575,
    y: 195,
    scores: { water: 1, fuel: 2, food: 1, shelter: 2 },
    hazards: ['heat', 'drought'],
    intel: [
      '无水窗口以小时计。行动放在清晨和黄昏，白天找荫。',
      '太阳蒸馏慢，只作补点。优先密封瓶装水和已知水窖。',
      '沙尘与热辐射伤眼，遮光和覆盖皮肤比赶路重要。',
    ],
    related: ['water-purify', 'water-store', 'heat', 'heat-cold'],
  },
  {
    id: 'europe',
    code: 'EU-06',
    name: '欧洲',
    en: 'EUROPE',
    biome: '温带 · 高密度城市',
    x: 528,
    y: 128,
    scores: { water: 4, fuel: 3, food: 3, shelter: 4 },
    hazards: ['cold', 'flood', 'storm'],
    intel: [
      '多数危机是城市停摆：停电、交通中断、超市空架，而不是荒野。',
      '冬季风暴叠加供暖中断，一氧化碳来自错误的室内燃烧。',
      '河流与海岸城市把洪水当默认情景，纸质地图和集合点仍然有效。',
    ],
    related: ['blackout', 'cold', 'flood', 'comms'],
  },
  {
    id: 'africa',
    code: 'AF-07',
    name: '非洲中南部',
    en: 'AFRICA',
    biome: '稀树草原 · 季节性降水',
    x: 545,
    y: 275,
    scores: { water: 2, fuel: 3, food: 2, shelter: 3 },
    hazards: ['drought', 'heat', 'flood'],
    intel: [
      '降水季节性强。干季把水、阴凉和夜间移动放在第一位。',
      '湿季道路迅速变成洪水情景：不蹚深水，伤口按污水处理。',
      '燃料相对好找，但煮沸用水仍可能比口粮更缺。',
    ],
    related: ['water-store', 'heat', 'hygiene', 'firecraft'],
  },
  {
    id: 'n-america',
    code: 'NA-08',
    name: '北美',
    en: 'N. AMERICA',
    biome: '从寒带到沙漠到飓风海岸',
    x: 228,
    y: 155,
    scores: { water: 3, fuel: 4, food: 3, shelter: 4 },
    hazards: ['quake', 'storm', 'cold', 'heat'],
    intel: [
      '西海岸地震、中部极端天气、东海岸飓风、北部极寒，不能用同一套包。',
      '荒野燃料和庇护材料总体充足，城市停水仍然按每人每天约 4 升计。',
      '车载受困时清开排气管，间歇换气，不要把发动机当无限暖炉。',
    ],
    related: ['earthquake', 'typhoon', 'cold', 'go-bag'],
  },
  {
    id: 's-america',
    code: 'SA-09',
    name: '南美',
    en: 'S. AMERICA',
    biome: '雨林、高原与南锥',
    x: 318,
    y: 310,
    scores: { water: 4, fuel: 4, food: 3, shelter: 4 },
    hazards: ['flood', 'quake', 'cold'],
    intel: [
      '雨林里水多、腐叶厚，庇护容易，感染和洪水才是主威胁。',
      '安第斯夜间迅速失温，隔地和挡风比寻找食物更紧急。',
      '不明植物不要赌。储备、明确无误的食物和煮沸优先。',
    ],
    related: ['shelter', 'hygiene', 'water-purify', 'wilderness'],
  },
  {
    id: 'oceania',
    code: 'OC-10',
    name: '澳洲与大洋',
    en: 'OCEANIA',
    biome: '干旱内陆 · 岛屿集水',
    x: 868,
    y: 335,
    scores: { water: 2, fuel: 2, food: 2, shelter: 3 },
    hazards: ['heat', 'drought', 'storm'],
    intel: [
      '内陆把水当成唯一硬通货。车辆受困先阴凉，再信号，再考虑步行。',
      '岛屿依赖降雨收集。风暴后淡水比口粮更先耗尽。',
      '海岸有风暴潮与珊瑚割伤，伤口按海水污染处理。',
    ],
    related: ['water-store', 'heat', 'signal-nav', 'radio-listen'],
  },
  {
    id: 'arctic',
    code: 'AR-11',
    name: '北极圈',
    en: 'ARCTIC',
    biome: '苔原与海冰',
    x: 500,
    y: 48,
    scores: { water: 3, fuel: 1, food: 1, shelter: 2 },
    hazards: ['cold'],
    intel: [
      '吃雪会加速失温。先融化再喝，燃料因此极其昂贵。',
      '雪是绝缘体。掩体要厚、内部要小，地面床不可省。',
      '白昼可能极短或极长。信号靠颜色、反光和规律呼叫，不要靠喊。',
    ],
    related: ['cold', 'shelter', 'firecraft', 'signal-nav'],
  },
  {
    id: 'pacific',
    code: 'PA-12',
    name: '太平洋岛屿',
    en: 'PACIFIC',
    biome: '珊瑚环礁 · 集水与风暴',
    x: 940,
    y: 248,
    scores: { water: 2, fuel: 2, food: 2, shelter: 2 },
    hazards: ['storm', 'flood'],
    intel: [
      '淡水几乎全靠降雨和运补。风暴后先修集水，再清点口粮。',
      '海拔低，风暴潮比风本身更危险。向内陆高处转移，不看风眼。',
      '搜救依赖信号与无线电收听。醒目布料和平坦空地比穿越礁盘更有效。',
    ],
    related: ['typhoon', 'water-store', 'signal-nav', 'radio-listen'],
  },
]

export function getAtlasRegion(id: string) {
  return atlasRegions.find((region) => region.id === id)
}

export function regionLayerScore(region: AtlasRegion, layer: AtlasLayer) {
  if (layer === 'all') return 3
  if (layer === 'hazard') return Math.min(5, region.hazards.length + 1)
  return region.scores[layer]
}
