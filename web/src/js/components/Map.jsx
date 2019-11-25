import * as React from 'react'
import {ResponsiveChoropleth} from '@nivo/geo'
import {feature, mapping} from '../../assets/data/data.js'
import {connect} from 'react-redux'
import {addCountry} from '../actions'
import styles from '../../css/Window.css'

const data = [
    {
        "id": "AFG",
        "value": 196938
    },
    {
        "id": "AGO",
        "value": 327912
    },
    {
        "id": "ALB",
        "value": 199557
    },
    {
        "id": "ARE",
        "value": 139525
    },
    {
        "id": "ARG",
        "value": 258710
    },
    {
        "id": "ARM",
        "value": 529784
    },
    {
        "id": "ATA",
        "value": 573410
    },
    {
        "id": "ATF",
        "value": 299362
    },
    {
        "id": "AUT",
        "value": 169064
    },
    {
        "id": "AZE",
        "value": 834389
    },
    {
        "id": "BDI",
        "value": 630925
    },
    {
        "id": "BEL",
        "value": 945599
    },
    {
        "id": "BEN",
        "value": 203403
    },
    {
        "id": "BFA",
        "value": 608158
    },
    {
        "id": "BGD",
        "value": 743333
    },
    {
        "id": "BGR",
        "value": 603556
    },
    {
        "id": "BHS",
        "value": 652903
    },
    {
        "id": "BIH",
        "value": 959294
    },
    {
        "id": "BLR",
        "value": 469569
    },
    {
        "id": "BLZ",
        "value": 422496
    },
    {
        "id": "BOL",
        "value": 447461
    },
    {
        "id": "BRN",
        "value": 293811
    },
    {
        "id": "BTN",
        "value": 628233
    },
    {
        "id": "BWA",
        "value": 731765
    },
    {
        "id": "CAF",
        "value": 583709
    },
    {
        "id": "CAN",
        "value": 510705
    },
    {
        "id": "CHE",
        "value": 915707
    },
    {
        "id": "CHL",
        "value": 943863
    },
    {
        "id": "CHN",
        "value": 709442
    },
    {
        "id": "CIV",
        "value": 88954
    },
    {
        "id": "CMR",
        "value": 342334
    },
    {
        "id": "COG",
        "value": 936993
    },
    {
        "id": "COL",
        "value": 638792
    },
    {
        "id": "CRI",
        "value": 299233
    },
    {
        "id": "CUB",
        "value": 213713
    },
    {
        "id": "-99",
        "value": 61528
    },
    {
        "id": "CYP",
        "value": 581463
    },
    {
        "id": "CZE",
        "value": 242007
    },
    {
        "id": "DEU",
        "value": 891443
    },
    {
        "id": "DJI",
        "value": 427151
    },
    {
        "id": "DNK",
        "value": 253089
    },
    {
        "id": "DOM",
        "value": 81416
    },
    {
        "id": "DZA",
        "value": 514832
    },
    {
        "id": "ECU",
        "value": 506720
    },
    {
        "id": "EGY",
        "value": 189283
    },
    {
        "id": "ERI",
        "value": 430729
    },
    {
        "id": "ESP",
        "value": 856429
    },
    {
        "id": "EST",
        "value": 928682
    },
    {
        "id": "ETH",
        "value": 707022
    },
    {
        "id": "FIN",
        "value": 721753
    },
    {
        "id": "FJI",
        "value": 519063
    },
    {
        "id": "FLK",
        "value": 202504
    },
    {
        "id": "FRA",
        "value": 932977
    },
    {
        "id": "GAB",
        "value": 270104
    },
    {
        "id": "GBR",
        "value": 738781
    },
    {
        "id": "GEO",
        "value": 693673
    },
    {
        "id": "GHA",
        "value": 228195
    },
    {
        "id": "GIN",
        "value": 643858
    },
    {
        "id": "GMB",
        "value": 91715
    },
    {
        "id": "GNB",
        "value": 613240
    },
    {
        "id": "GNQ",
        "value": 633547
    },
    {
        "id": "GRC",
        "value": 327717
    },
    {
        "id": "GTM",
        "value": 93673
    },
    {
        "id": "GUY",
        "value": 835698
    },
    {
        "id": "HND",
        "value": 276155
    },
    {
        "id": "HRV",
        "value": 139809
    },
    {
        "id": "HTI",
        "value": 800623
    },
    {
        "id": "HUN",
        "value": 336778
    },
    {
        "id": "IDN",
        "value": 674303
    },
    {
        "id": "IND",
        "value": 929470
    },
    {
        "id": "IRL",
        "value": 936771
    },
    {
        "id": "IRN",
        "value": 11592
    },
    {
        "id": "IRQ",
        "value": 913676
    },
    {
        "id": "ISL",
        "value": 926117
    },
    {
        "id": "ISR",
        "value": 341112
    },
    {
        "id": "ITA",
        "value": 709695
    },
    {
        "id": "JAM",
        "value": 680723
    },
    {
        "id": "JOR",
        "value": 76534
    },
    {
        "id": "JPN",
        "value": 769996
    },
    {
        "id": "KAZ",
        "value": 459359
    },
    {
        "id": "KEN",
        "value": 623791
    },
    {
        "id": "KGZ",
        "value": 754578
    },
    {
        "id": "KHM",
        "value": 339727
    },
    {
        "id": "OSA",
        "value": 783096
    },
    {
        "id": "KWT",
        "value": 517461
    },
    {
        "id": "LAO",
        "value": 269599
    },
    {
        "id": "LBN",
        "value": 781618
    },
    {
        "id": "LBR",
        "value": 203969
    },
    {
        "id": "LBY",
        "value": 22594
    },
    {
        "id": "LKA",
        "value": 393990
    },
    {
        "id": "LSO",
        "value": 987984
    },
    {
        "id": "LTU",
        "value": 399332
    },
    {
        "id": "LUX",
        "value": 120967
    },
    {
        "id": "LVA",
        "value": 54985
    },
    {
        "id": "MAR",
        "value": 133326
    },
    {
        "id": "MDA",
        "value": 918280
    },
    {
        "id": "MDG",
        "value": 201925
    },
    {
        "id": "MEX",
        "value": 350052
    },
    {
        "id": "MKD",
        "value": 953414
    },
    {
        "id": "MLI",
        "value": 567570
    },
    {
        "id": "MMR",
        "value": 543897
    },
    {
        "id": "MNE",
        "value": 924196
    },
    {
        "id": "MNG",
        "value": 592452
    },
    {
        "id": "MOZ",
        "value": 829632
    },
    {
        "id": "MRT",
        "value": 773429
    },
    {
        "id": "MWI",
        "value": 423440
    },
    {
        "id": "MYS",
        "value": 110513
    },
    {
        "id": "NAM",
        "value": 39780
    },
    {
        "id": "NCL",
        "value": 3275
    },
    {
        "id": "NER",
        "value": 954836
    },
    {
        "id": "NGA",
        "value": 444932
    },
    {
        "id": "NIC",
        "value": 111009
    },
    {
        "id": "NLD",
        "value": 942518
    },
    {
        "id": "NOR",
        "value": 569579
    },
    {
        "id": "NPL",
        "value": 407461
    },
    {
        "id": "NZL",
        "value": 872901
    },
    {
        "id": "OMN",
        "value": 249747
    },
    {
        "id": "PAK",
        "value": 599627
    },
    {
        "id": "PAN",
        "value": 695736
    },
    {
        "id": "PER",
        "value": 962785
    },
    {
        "id": "PHL",
        "value": 574053
    },
    {
        "id": "PNG",
        "value": 641279
    },
    {
        "id": "POL",
        "value": 551700
    },
    {
        "id": "PRI",
        "value": 729944
    },
    {
        "id": "PRT",
        "value": 195790
    },
    {
        "id": "PRY",
        "value": 675218
    },
    {
        "id": "QAT",
        "value": 587243
    },
    {
        "id": "ROU",
        "value": 103661
    },
    {
        "id": "RUS",
        "value": 357815
    },
    {
        "id": "RWA",
        "value": 205566
    },
    {
        "id": "ESH",
        "value": 518101
    },
    {
        "id": "SAU",
        "value": 888945
    },
    {
        "id": "SDN",
        "value": 900711
    },
    {
        "id": "SDS",
        "value": 75783
    },
    {
        "id": "SEN",
        "value": 422569
    },
    {
        "id": "SLB",
        "value": 702526
    },
    {
        "id": "SLE",
        "value": 40376
    },
    {
        "id": "SLV",
        "value": 476257
    },
    {
        "id": "ABV",
        "value": 754211
    },
    {
        "id": "SOM",
        "value": 956548
    },
    {
        "id": "SRB",
        "value": 844956
    },
    {
        "id": "SUR",
        "value": 47502
    },
    {
        "id": "SVK",
        "value": 702785
    },
    {
        "id": "SVN",
        "value": 396538
    },
    {
        "id": "SWZ",
        "value": 748260
    },
    {
        "id": "SYR",
        "value": 519760
    },
    {
        "id": "TCD",
        "value": 934205
    },
    {
        "id": "TGO",
        "value": 42676
    },
    {
        "id": "THA",
        "value": 699807
    },
    {
        "id": "TJK",
        "value": 446441
    },
    {
        "id": "TKM",
        "value": 660996
    },
    {
        "id": "TLS",
        "value": 423997
    },
    {
        "id": "TTO",
        "value": 295039
    },
    {
        "id": "TUN",
        "value": 765745
    },
    {
        "id": "TUR",
        "value": 945796
    },
    {
        "id": "TWN",
        "value": 307795
    },
    {
        "id": "TZA",
        "value": 463377
    },
    {
        "id": "UGA",
        "value": 701199
    },
    {
        "id": "UKR",
        "value": 431922
    },
    {
        "id": "URY",
        "value": 890620
    },
    {
        "id": "USA",
        "value": 651903
    },
    {
        "id": "UZB",
        "value": 699883
    },
    {
        "id": "VEN",
        "value": 263980
    },
    {
        "id": "VNM",
        "value": 470814
    },
    {
        "id": "VUT",
        "value": 221215
    },
    {
        "id": "PSE",
        "value": 195429
    },
    {
        "id": "YEM",
        "value": 486716
    },
    {
        "id": "ZAF",
        "value": 103272
    },
    {
        "id": "ZMB",
        "value": 686761
    },
    {
        "id": "ZWE",
        "value": 641158
    },
    {
        "id": "KOR",
        "value": 642526
    },
    {
        "id": "AUS",
        "value": 312413
    }
]
export const getCountryName = (country) => {
    return Object.keys(mapping).filter(userName => mapping[userName].countryName === country).map(userName => mapping[userName])
}

const Map = (props) => {
    const handleClick = (data, e) => {
        this.props.addCountry(data.id)
    }
    return (<ResponsiveChoropleth
        data={data}
        features={feature.features}
        margin={{top: 0, right: 0, bottom: 0, left: 0}}
        colors="RdYlBu"
        domain={[0, 1000000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        onClick={(dat, e) => props.addCountry(dat.id)}
        tooltip={
            (resp, e) => {
                return (
                    <div styleName='styles.mapTooltip'>
                        Country: <strong>{resp.feature.properties.name}</strong>
                        <br/>
                        ISO3: <strong>{resp.feature.id}</strong>
                    </div>
                )
            }
        }
    />)
}


export default connect(
    null,
    {addCountry},
)(Map)