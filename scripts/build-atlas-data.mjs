import fs from 'node:fs'

const world = JSON.parse(fs.readFileSync('public/geo/world.json', 'utf8'))
const mapNames = new Set(world.features.map((f) => f.properties.name))
const waterRows = JSON.parse(fs.readFileSync(`${process.env.TEMP}/wb-water-all.json`, 'utf8'))[1] || []
const stressRows = JSON.parse(fs.readFileSync(`${process.env.TEMP}/wb-stress-all.json`, 'utf8'))[1] || []
const countries = JSON.parse(fs.readFileSync(`${process.env.TEMP}/wb-countries.json`, 'utf8'))[1] || []

const iso3ToMap = {
  AFG: 'Afghanistan', ALB: 'Albania', DZA: 'Algeria', AGO: 'Angola', ARG: 'Argentina',
  ARM: 'Armenia', AUS: 'Australia', AUT: 'Austria', AZE: 'Azerbaijan', BHS: 'Bahamas',
  BHR: 'Bahrain', BGD: 'Bangladesh', BRB: 'Barbados', BLR: 'Belarus', BEL: 'Belgium',
  BLZ: 'Belize', BEN: 'Benin', BTN: 'Bhutan', BOL: 'Bolivia', BIH: 'Bosnia and Herz.',
  BWA: 'Botswana', BRA: 'Brazil', BRN: 'Brunei', BGR: 'Bulgaria', BFA: 'Burkina Faso',
  BDI: 'Burundi', KHM: 'Cambodia', CMR: 'Cameroon', CAN: 'Canada', CPV: 'Cape Verde',
  CAF: 'Central African Rep.', TCD: 'Chad', CHL: 'Chile', CHN: 'China', COL: 'Colombia',
  COM: 'Comoros', COG: 'Congo', COD: 'Dem. Rep. Congo', CRI: 'Costa Rica', CIV: "Côte d'Ivoire",
  HRV: 'Croatia', CUB: 'Cuba', CYP: 'Cyprus', CZE: 'Czech Rep.', DNK: 'Denmark',
  DJI: 'Djibouti', DOM: 'Dominican Rep.', ECU: 'Ecuador', EGY: 'Egypt', SLV: 'El Salvador',
  GNQ: 'Eq. Guinea', ERI: 'Eritrea', EST: 'Estonia', ETH: 'Ethiopia', FJI: 'Fiji',
  FIN: 'Finland', FRA: 'France', GAB: 'Gabon', GMB: 'Gambia', GEO: 'Georgia', DEU: 'Germany',
  GHA: 'Ghana', GRC: 'Greece', GTM: 'Guatemala', GIN: 'Guinea', GNB: 'Guinea-Bissau',
  GUY: 'Guyana', HTI: 'Haiti', HND: 'Honduras', HUN: 'Hungary', ISL: 'Iceland', IND: 'India',
  IDN: 'Indonesia', IRN: 'Iran', IRQ: 'Iraq', IRL: 'Ireland', ISR: 'Israel', ITA: 'Italy',
  JAM: 'Jamaica', JPN: 'Japan', JOR: 'Jordan', KAZ: 'Kazakhstan', KEN: 'Kenya', KIR: 'Kiribati',
  PRK: 'Dem. Rep. Korea', KOR: 'Korea', KWT: 'Kuwait', KGZ: 'Kyrgyzstan', LAO: 'Lao PDR',
  LVA: 'Latvia', LBN: 'Lebanon', LSO: 'Lesotho', LBR: 'Liberia', LBY: 'Libya', LTU: 'Lithuania',
  LUX: 'Luxembourg', MKD: 'Macedonia', MDG: 'Madagascar', MWI: 'Malawi', MYS: 'Malaysia',
  MLI: 'Mali', MLT: 'Malta', MRT: 'Mauritania', MUS: 'Mauritius', MEX: 'Mexico', FSM: 'Micronesia',
  MDA: 'Moldova', MNG: 'Mongolia', MNE: 'Montenegro', MAR: 'Morocco', MOZ: 'Mozambique',
  MMR: 'Myanmar', NAM: 'Namibia', NPL: 'Nepal', NLD: 'Netherlands', NZL: 'New Zealand',
  NIC: 'Nicaragua', NER: 'Niger', NGA: 'Nigeria', NOR: 'Norway', OMN: 'Oman', PAK: 'Pakistan',
  PAN: 'Panama', PNG: 'Papua New Guinea', PRY: 'Paraguay', PER: 'Peru', PHL: 'Philippines',
  POL: 'Poland', PRT: 'Portugal', QAT: 'Qatar', ROU: 'Romania', RUS: 'Russia', RWA: 'Rwanda',
  WSM: 'Samoa', SAU: 'Saudi Arabia', SEN: 'Senegal', SRB: 'Serbia', SYC: 'Seychelles',
  SLE: 'Sierra Leone', SGP: 'Singapore', SVK: 'Slovakia', SVN: 'Slovenia', SLB: 'Solomon Is.',
  SOM: 'Somalia', ZAF: 'South Africa', SSD: 'S. Sudan', ESP: 'Spain', LKA: 'Sri Lanka',
  SDN: 'Sudan', SUR: 'Suriname', SWZ: 'Swaziland', SWE: 'Sweden', CHE: 'Switzerland',
  SYR: 'Syria', TJK: 'Tajikistan', TZA: 'Tanzania', THA: 'Thailand', TLS: 'Timor-Leste',
  TGO: 'Togo', TON: 'Tonga', TTO: 'Trinidad and Tobago', TUN: 'Tunisia', TUR: 'Turkey',
  TKM: 'Turkmenistan', UGA: 'Uganda', UKR: 'Ukraine', ARE: 'United Arab Emirates',
  GBR: 'United Kingdom', USA: 'United States', URY: 'Uruguay', UZB: 'Uzbekistan',
  VUT: 'Vanuatu', VEN: 'Venezuela', VNM: 'Vietnam', YEM: 'Yemen', ZMB: 'Zambia', ZWE: 'Zimbabwe',
  ATG: 'Antigua and Barb.', PSE: 'Palestine', STP: 'São Tomé and Principe',
  VCT: 'St. Vin. and Gren.', LCA: 'Saint Lucia',
}

const zh = {
  AFG: '阿富汗', ALB: '阿尔巴尼亚', DZA: '阿尔及利亚', AGO: '安哥拉', ARG: '阿根廷', ARM: '亚美尼亚',
  AUS: '澳大利亚', AUT: '奥地利', AZE: '阿塞拜疆', BHS: '巴哈马', BHR: '巴林', BGD: '孟加拉国',
  BRB: '巴巴多斯', BLR: '白俄罗斯', BEL: '比利时', BLZ: '伯利兹', BEN: '贝宁', BTN: '不丹',
  BOL: '玻利维亚', BIH: '波黑', BWA: '博茨瓦纳', BRA: '巴西', BRN: '文莱', BGR: '保加利亚',
  BFA: '布基纳法索', BDI: '布隆迪', KHM: '柬埔寨', CMR: '喀麦隆', CAN: '加拿大', CPV: '佛得角',
  CAF: '中非', TCD: '乍得', CHL: '智利', CHN: '中国', COL: '哥伦比亚', COM: '科摩罗', COG: '刚果（布）',
  COD: '刚果（金）', CRI: '哥斯达黎加', CIV: '科特迪瓦', HRV: '克罗地亚', CUB: '古巴', CYP: '塞浦路斯',
  CZE: '捷克', DNK: '丹麦', DJI: '吉布提', DOM: '多米尼加', ECU: '厄瓜多尔', EGY: '埃及',
  SLV: '萨尔瓦多', GNQ: '赤道几内亚', ERI: '厄立特里亚', EST: '爱沙尼亚', ETH: '埃塞俄比亚',
  FJI: '斐济', FIN: '芬兰', FRA: '法国', GAB: '加蓬', GMB: '冈比亚', GEO: '格鲁吉亚', DEU: '德国',
  GHA: '加纳', GRC: '希腊', GTM: '危地马拉', GIN: '几内亚', GNB: '几内亚比绍', GUY: '圭亚那',
  HTI: '海地', HND: '洪都拉斯', HUN: '匈牙利', ISL: '冰岛', IND: '印度', IDN: '印度尼西亚',
  IRN: '伊朗', IRQ: '伊拉克', IRL: '爱尔兰', ISR: '以色列', ITA: '意大利', JAM: '牙买加',
  JPN: '日本', JOR: '约旦', KAZ: '哈萨克斯坦', KEN: '肯尼亚', KIR: '基里巴斯', PRK: '朝鲜',
  KOR: '韩国', KWT: '科威特', KGZ: '吉尔吉斯斯坦', LAO: '老挝', LVA: '拉脱维亚', LBN: '黎巴嫩',
  LSO: '莱索托', LBR: '利比里亚', LBY: '利比亚', LTU: '立陶宛', LUX: '卢森堡', MKD: '北马其顿',
  MDG: '马达加斯加', MWI: '马拉维', MYS: '马来西亚', MLI: '马里', MLT: '马耳他', MRT: '毛里塔尼亚',
  MUS: '毛里求斯', MEX: '墨西哥', FSM: '密克罗尼西亚', MDA: '摩尔多瓦', MNG: '蒙古', MNE: '黑山',
  MAR: '摩洛哥', MOZ: '莫桑比克', MMR: '缅甸', NAM: '纳米比亚', NPL: '尼泊尔', NLD: '荷兰',
  NZL: '新西兰', NIC: '尼加拉瓜', NER: '尼日尔', NGA: '尼日利亚', NOR: '挪威', OMN: '阿曼',
  PAK: '巴基斯坦', PAN: '巴拿马', PNG: '巴布亚新几内亚', PRY: '巴拉圭', PER: '秘鲁', PHL: '菲律宾',
  POL: '波兰', PRT: '葡萄牙', QAT: '卡塔尔', ROU: '罗马尼亚', RUS: '俄罗斯', RWA: '卢旺达',
  WSM: '萨摩亚', SAU: '沙特阿拉伯', SEN: '塞内加尔', SRB: '塞尔维亚', SYC: '塞舌尔', SLE: '塞拉利昂',
  SGP: '新加坡', SVK: '斯洛伐克', SVN: '斯洛文尼亚', SLB: '所罗门群岛', SOM: '索马里',
  ZAF: '南非', SSD: '南苏丹', ESP: '西班牙', LKA: '斯里兰卡', SDN: '苏丹', SUR: '苏里南',
  SWZ: '斯威士兰', SWE: '瑞典', CHE: '瑞士', SYR: '叙利亚', TJK: '塔吉克斯坦', TZA: '坦桑尼亚',
  THA: '泰国', TLS: '东帝汶', TGO: '多哥', TON: '汤加', TTO: '特立尼达和多巴哥', TUN: '突尼斯',
  TUR: '土耳其', TKM: '土库曼斯坦', UGA: '乌干达', UKR: '乌克兰', ARE: '阿联酋', GBR: '英国',
  USA: '美国', URY: '乌拉圭', UZB: '乌兹别克斯坦', VUT: '瓦努阿图', VEN: '委内瑞拉', VNM: '越南',
  YEM: '也门', ZMB: '赞比亚', ZWE: '津巴布韦', ATG: '安提瓜和巴布达', PSE: '巴勒斯坦',
  STP: '圣多美和普林西比', VCT: '圣文森特和格林纳丁斯', LCA: '圣卢西亚',
}

/** USGS / GEM 高地震危险区：环太平洋 + 阿尔卑斯—喜马拉雅等公开高危带 */
const seismicHigh = new Set([
  'JPN', 'PHL', 'IDN', 'PNG', 'SLB', 'VUT', 'TON', 'NZL', 'CHL', 'PER', 'ECU', 'COL',
  'MEX', 'GTM', 'SLV', 'NIC', 'CRI', 'PAN', 'USA', 'RUS', 'CHN', 'IRN', 'TUR', 'GRC',
  'ITA', 'AFG', 'PAK', 'NPL', 'BTN', 'MMR', 'IND', 'HTI', 'TWN',
])
const seismicModerate = new Set([
  'CAN', 'ROU', 'DZA', 'MAR', 'ALB', 'MKD', 'BIH', 'HRV', 'SVN', 'GEO', 'ARM', 'AZE',
  'TJK', 'KGZ', 'KAZ', 'MNG', 'LAO', 'VNM', 'BGD', 'DOM', 'JAM', 'CUB', 'VEN', 'BOL',
  'ARG', 'ISL', 'CYP', 'LBN', 'ISR', 'JOR', 'YEM', 'TLS', 'FJI', 'WSM', 'KOR', 'PRK',
])

/** WMO 热带气旋主要影响区（西北太、北大西洋、北印度洋、南印度洋、南太） */
const cyclone = new Set([
  'CHN', 'JPN', 'KOR', 'PHL', 'VNM', 'LAO', 'KHM', 'TWN',
  'USA', 'MEX', 'CUB', 'HTI', 'DOM', 'JAM', 'BHS', 'BLZ', 'HND', 'NIC', 'GTM', 'CRI', 'PAN',
  'IND', 'BGD', 'MMR', 'LKA', 'OMN', 'YEM', 'PAK',
  'MDG', 'MOZ', 'MUS', 'AUS', 'FJI', 'VUT', 'TON', 'WSM', 'NZL', 'SLB', 'PNG', 'COM',
])

function latestByIso3(rows) {
  const map = new Map()
  for (const row of rows) {
    const iso3 = row.countryiso3code
    if (!iso3 || row.value == null || iso3.length !== 3) continue
    const prev = map.get(iso3)
    if (!prev || Number(row.date) > Number(prev.date)) map.set(iso3, { value: row.value, year: row.date })
  }
  return map
}

const water = latestByIso3(waterRows)
const stress = latestByIso3(stressRows)
const wbByIso3 = new Map(countries.filter((c) => c.id && c.id.length === 3 && c.region?.id !== 'NA').map((c) => [c.id, c]))

const records = []
for (const [iso3, mapName] of Object.entries(iso3ToMap)) {
  if (!mapNames.has(mapName)) continue
  const w = water.get(iso3)
  const s = stress.get(iso3)
  records.push({
    mapName,
    iso3,
    nameZh: zh[iso3] || wbByIso3.get(iso3)?.name || mapName,
    waterM3: w ? Math.round(w.value) : null,
    waterYear: w ? String(w.year) : null,
    stressPct: s ? Math.round(s.value * 10) / 10 : null,
    stressYear: s ? String(s.year) : null,
    seismic: seismicHigh.has(iso3) ? 'high' : seismicModerate.has(iso3) ? 'moderate' : 'low',
    cyclone: cyclone.has(iso3),
  })
}

records.sort((a, b) => a.nameZh.localeCompare(b.nameZh, 'zh'))
fs.writeFileSync('src/content/atlas-countries.json', JSON.stringify(records, null, 2))
console.log('countries', records.length, 'with water', records.filter((r) => r.waterM3 != null).length)
