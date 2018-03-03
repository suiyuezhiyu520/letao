/**
 * Created by Administrator on 2018/3/3.
 */
$(function(){
    var myChart1 = echarts.init(document.getElementsByClassName('char1')[0]);

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);


    var option2 = {
        title : {
            text: '热门品牌销售量',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['阿迪达斯','花花公子','耐克','李宁','快鱼']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'阿迪达斯'},
                    {value:310, name:'花花公子'},
                    {value:234, name:'耐克'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'快鱼'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    var myChart2 = echarts.init(document.getElementsByClassName('char2')[0]);
    myChart2.setOption(option2);

})