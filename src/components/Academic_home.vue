<template>
  <div>
    <NavBar></NavBar>
    <div>
      <el-row>
        <el-col :span="8">
          <div>
            <span style="margin-left: 5%"
              ><i class="el-icon-info" style="font-size: 25px" > 学者信息</i></span
            >
          </div>
        </el-col>
        <el-col :span="12">
          <div></div>
        </el-col>
        <el-col :span="8">
          <div >
 <!--           <span style="margin-left: 80%"
              ><i class="el-icon-view" style="font-size: 25px"> 学者关系</i></span
            >
            -->
          </div>
        </el-col>
        <el-col :span="3">
          <div><p></p></div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-button
              type="primary"
              v-show="isScholar"
              size="mini"
              style="float: right"
              @click="sendMessage"
              >发送私信</el-button
            >
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <table style="width: 100%">
        <tr>
          <td style="width: 60%">
            <div  >
            
              <div style="margin-left:5%;">
                  <el-card class="box-card">
<div style="float:left;margin-top:10%;margin-left:5%;margin-bottom:10%">
                  <img src="../../public/default_researcher.jpg" style="border-radius:50%">
                  <div >
                      <!--style="float:right;marigin-top:110%"-->
           <el-button plain icon="el-icon-star" @click="follow" style="font-size: 16px;margin-top:3%;width:120px" v-show="canFollow">关 注</el-button>
           <el-button plain icon="el-icon-star" @click="cancelFollow" style="font-size: 16px;margin-top:3%;width:110px"  v-show="canCancelFollow">取消关注</el-button>
                  </div>
                  <div>
                   <el-button :v-show="form.role=='1'&&islogin" type="primary" style="font-size: 16px;margin-top:5%" @click="toIdentify" >认领主页</el-button>
                   </div>
</div>
<div style="float:left;margin-top:10%;margin-left:5%;margin-bottom:10%">
                <!--<p>ID: {{ researcher.id }}</p>-->
                <p style="margin-top: 5%">姓名： {{ researcher.name }}</p>
                <!-- <p style="margin-top:3%">研究领域：  {{researcher.field1}},{{researcher.field2}},{{researcher.field3}}</p> -->

                <p style="margin-top: 5%">
                  合作机构： {{ researcher.organization }}
                </p>
                <p style="margin-top: 5%">
                  论文数量： {{ researcher.papercount }}篇
                </p>
                <p style="margin-top: 5%">Hindex ：{{ researcher.index }}</p>
                <p style="margin-top: 5%">简介： {{ researcher.info }}</p>
</div>
                                                </el-card>
              </div>

                                          <div style="text-align: center;margin-top: 10%">
                                
                                   
                            </div>
                            <!--这里用了form的role判断是否需要认领，普通用户则展示-->
              <!--
              <div style="margin-left: 5%; margin-top: 20%">
                <span>上传头像</span>
              </div>

              <div>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  style="margin-left: 30%"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              -->
              <div style="margin-top:5%;margin-left:5%">
               <span style="font-size: 25px">学者文献</span>
      <!--
            <el-button type="primary" @click="add_file" style="margin-left:90% ; ">
                <i class="el-icon-document" ></i><span>添加文献</span>
            </el-button>
            -->
      <el-main>
        <el-table
          :data="doc_table"
          style="width: 100%;"
          :row-style="{ height: '30px' }"
          max-height="400"
        >
          <el-table-column
            prop="title"
            label="题目"
            @contextmenu.prevent=""
          ></el-table-column>
          <el-table-column
            prop="year"
            label="发表时间"
            width="100%"
          ></el-table-column>
          <el-table-column
            prop="keywords"
            label="关键字"
            width="300%"
          ></el-table-column>
          <el-table-column
            prop="citation"
            label="被引用量"
            width="100%"
          ></el-table-column>
           <!-- 
      //    <el-table-column fixed="right" width="50">
                       <template slot-scope="scope">
                <el-tooltip  effect="dark" content="删除" placement="bottom-end">
                  <el-button @click.native="delFile(scope.row.id)" type="text" style="color: #999" size="mini">
                    <i class="el-icon-delete-solid"></i>
                  </el-button>
                </el-tooltip>
              </template>
            
          </el-table-column>
            -->
        </el-table>
      </el-main>
              </div>
                            
            </div>
          </td>
          <el-divider direction="vertical"></el-divider>
          <td style="width: 36%">
            <div>
              <!--关系图表-->

            
              <div class="Echarts">
                <div id="f_main" style="width: 400px; height: 400px"></div>
              </div>
            <!--
              <div class="Echarts">
                <div id="p_main" style="width: 400px; height: 400px"></div>
              </div>
              -->
                <div class="Echarts">
                  <div id="z_main" style="width: 400px; height: 400px"></div>
                </div>
              
            </div>
            <!--
                        <div style="margin-top: 0%;height: 700px">
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin-top: 0px">
                                <el-menu-item index="1" @click="showSysMessagelist">系统通知</el-menu-item>
                                <el-menu-item index="2" @click="showScoMessagelist">学者私信</el-menu-item>
                                <el-menu-item index="3" @click="showMineMessagelist">我的私信</el-menu-item>
                            </el-menu>
                            <div style="height: 5px"></div>
                            <div v-for="(item,index) in message" :key="item" @click="viewMessage(item)">
                                <table style="width: 100%">
                                    <tr style="height: 60px">
                                        <td style="width: 10%">
                                            <div style="height: 60px;font-size: 35px">
                                                <i  v-show="item.isread = 0" class="el-icon-s-release" style="color: red;margin-bottom: 5px;margin-left: 5px;margin-top: 10px"></i>
                                                <i  v-show="item.isread = 1" class="el-icon-s-claim" style="color: lawngreen;margin-bottom: 5px;margin-left: 5px;margin-top: 10px"></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div style="margin-left: 1%;margin-top:1px;font-size: 14px">
                                                {{item.from}}
                                            </div>
                                            <div style="margin-left: 1%;margin-top: 10px;font-size: 12px">
                                                {{item.text}}
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                        </div>
                        -->
          </td>
        </tr>
      </table>
      <el-divider></el-divider>
     

      <el-dialog title="学者认证" :visible.sync="dialogFormVisible3"
        ><!--发送私信-->
        <el-form :model="identifyinfo">
          <el-form-item label="申请用户id">
            <el-input
              style="width: 45%; margin-left: 2%"
              v-model="identifyinfo.id"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份认证信息">
            <el-input
              type="email"
              style="width: 65%"
              v-model="identifyinfo.identifyemail"
              autocomplete="off"
              placeholder="请填写邮箱"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitIdentify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    import NavBar from "../homepage/NavBar";
    import ElDivider from "../../node_modules/element-ui/packages/divider/src/main.vue";
    import ElAvatar from "../../node_modules/element-ui/packages/avatar/src/main.vue";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
    import axios from "axios";
    export default {
       // name:'Echarts',
        mounted()
        {
         //   this.myEcharts();
        },
        components: {
            NavBar,
            ElInput,
            ElButton,
            ElAvatar,
            ElDivider},
        name: 'Academic_home',
          inject: ['reload'],
        props: {
            msg: String
        },
        data() {
            return {
               canFollow: false,
              canCancelFollow: false,
                isuser:false,
                isScholar:false,//是否是认证学者，是则为true
                activeIndex: '1',
                dialogFormVisible: false,//回复私信的dialog
                dialogFormVisible2: false,//发送私信的dialog
                dialogFormVisible3: false,//学者认证的dialog
                formLabelWidth: '120px',
                select:0,//选择查看哪一个消息
                reply:'',//回复内容
                islogin:false,
                editing:false,//信息是否处于可编辑状态
                form: {
                    id: this.$store.state.userid,
                    name: '',
                    email: '',
                    info: ''
                },//当前登录用户的信息状态

                researcher:
                {
                   id:'',
                   researcher_id:this.$route.params.id,
                   name:'',
                   organization:'',
                   papercount:'',
                   index:'',
                   info:'',
                },//当前页面学者的信息
                doc_table:
                [
                    {
                        title:'',
                        year:'',
                        keywords:'',
                        citation:'',

                    },

                ],
                force_option:
                {

                },
                //学科分类发表构件
                pie_option:
                {
                        title: {
        text: '研究领域',
        right:0
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 0,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },    grid: {
        left: '50%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    series: [
        {
            name: '发表类别',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
},

    // 配置项
     f_option : {
        grid:
        {
 bottom:5,top:5
        },

      // 标题设置
      title: {
        // 主标题
        text: '学者关系图',
        // 副标题
      //  subtext: '西安电子科技大学力导图',
        // 位置
        top: 'top',

      },
      // 提示框设置
      tooltip: {
        // 关闭提示框
      //  show: true
      },
      // 图例设置
      legend: [{
          itemWidth:20,
          itemHeight:20,
        // 纵向
        orient: 'horizonal',
        // 位置
        left: 'right',
        // 图例内容，由上面的分类集合决定

      }],
      // 数据设置
      series: [{
        // 类型
        type: 'graph',
        // 力导图布局
        layout: 'force',
        // 开启平移与缩放
        roam: false,
        // 标签设置
        label: {
          normal: {
            // 是否展示
            show: false,
            // 展示位置
            position: 'top',
            // 展示内容
            // formatter: '{b}',
            // 文本设置
            textStyle: {
              // 文本大小
              fontSize: '12px'
            },
          }
        },
        // 根据value放缩节点
        symbolSize: 20,
        // 是否可拖拽
        draggable: true,
        // 节点数据
        data:[
          {
            // 分类
            category: '学者',
            // 名称
            name: "西安电子科技大学",
            // 值，越大则节点越大
            value:1
          },
          {
            category: '属性',
            name: "《与共和国同行》",
            value:3
          },
          {
            category: '属性',
            name: "杨宗凯",
            value:2
          },
          {
            category: '其他',
            name: "西北工业大学",
            value:1
          },
        ],
        // 分类
        categories:[
      {name: '学者'},
      {name: '属性'},
      {name: '其他'}
    ],
        force: {
            edgeLength: 200,
            repulsion: 300,
             gravity: 0.1
        },
        // 关系
        links:[
          {
            // 源节点
            source: "西安电子科技大学",
            // 目标节点
            target: "《与共和国同行》",
            // 标签设置
            label: {
              normal: {
                // 是否展示
                show: true,
                // 展示内容
                formatter: '校歌'
              }
            }
          },
          {
            source: "西安电子科技大学",
            target: "杨宗凯",
            label: {
              normal: {
                show: true,
                formatter: '校长'
              }
            }
          },
          {
            source: "西安电子科技大学",
            target: "西北工业大学",
            label: {
              normal: {
                show: true,
                formatter: '兄弟院校'
              }
            }
          }
        ],
      }]
    },
//年份-发表构件
        zhe_option:
                {

    title: {
        text: '论文发表趋势'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
   //     itemWidth:50,
   //     itemHeight:50,
        data: ['发表数量']
    },
    toolbox: {

    },
    grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
       
        {
            name: '发表数量',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [2, 5,3, 1, 6, 9, 0]
        }
    ]
                },

                //message数组看实际情况加载内容，比如在“系统通知”则加载系统通知，切换其它目录时清空后重新加载
                message:[{},{}],
                send_message:{
                    to: '',
                    text: ''
                },
                identifyinfo:{
                    id:'',//用户id
                    identifyemail: ''//认证邮箱
                }
                
            }
        },
        created(){
            if (sessionStorage.getItem("userL")!= null){
                 this.get_user_info();
                             this.getFollow()
                             this.islogin=true
      }
        //    this.get_user_info();
            this.get_acad_info();
         //   this.getFollow()
        //    this.get_acad_docs()
       //     this.get_graph_info()//由于关系图有点麻烦回头再添加上去，这里是将其他两个图的信息放进去
            

           // this.get_acad_docs();
          //  this.get_graph_info();//由于关系图有点麻烦回头再添加上去，这里是将其他两个图的信息放进去
            this.showSysMessagelist();
        },

        methods: {
            
            myEcharts()
            {
            
            //    var pieChart = this.$echarts.init(document.getElementById('p_main'));              
            //    pieChart.setOption(this.pie_option);
            var that=this
                var zheChart = that.$echarts.init(document.getElementById('z_main'));              
                zheChart.setOption(that.zhe_option);
                that.set_forcechart();

            },
            set_forcechart()
            {
                 var myChart = this.$echarts.init(document.getElementById('f_main'));
    // 分类集合
   
    myChart.setOption(this.f_option);

            },

            /*
                        viewMessage(item){
                let postData = {
                    'Mid': item.id
                }
                this.$axios.post('/message/read', postData).then((response) => {
                    for(let i = 0; i < this.message.length; i++){
                        if(message[i].id == response.data.id){
                            this.select = i;
                            break;
                        }
                    }
                    this.message[select].isread = 1;//改变已读状态
                    this.dialogFormVisible = true;
                })

                this.$axios({//将新的状态返回
                    method:'post',
                    url:'/message/read',
                    data:{
                        Mid: item.id
                    }
                }).catch(err=>{console.log(err)})


            }
            */
           get_graph_info()
           {
               var that=this//折线图
                this.$axios.post('researcher/yearPub/'+that.researcher.name).then (function(resopnse)
                {
                   var year =[]
                   var num =[]
                   for(var i=0;i<res.data.length;i++)
                   {
                       year.push(res.data[i].year)
                       num.push(res.data[i].num)
                   }
                   that.zhe_option.xAxis[0].data=year
                   that.zhe_option.series[0].data=num
                   
                }).catch(function (error)
                {
                    console.log(error)
                })//饼图
                 that.$axios.post('researcher/fieldPub/'+that.researcher.name).then (function(resopnse)
                {
                   var filed=[]
                   var num=[]//值-name数组
                   for(var i=0;i<res.data.length;i++)
                   {
                       var now=new Object()
                       now.value=res.data[i].paperCount
                       now.name=res.data[i].name
                       num.push(now)
                       filed.push(res.data[i].filed)
                   }
                   that.pie_option.legend.data=filed
                   that.pie_option.series[0].data=num
                  
                   
                }).catch(function (error)
                {
                    console.log(error)
                })

           },
           get_acad_docs()//功能已经被集成在了get_acad_info()
           {
                var that=this
           //     alert(this.researcher.name)
                axios.post('researcher/paper?AuthorName='+that.researcher.name).then (function(res)
                {
                    that.doc_table=res.data.data
                   
                }).catch(function (error)
                {
                    console.log(error)
                })
           },
            get_acad_info()
            { 

            /*    let postdata=
                {
                    'id':this.$store.state.id//路由器的传值
                }
                */
                var that=this
                axios.post('/researcher/info/'+that.$route.params.id).then (function(res)
                {
               //     that.researcher.id=res.data.data.id
                    that.researcher.name=res.data.data.name
                    that.researcher.email=res.data.data.email
                    that.researcher.organization=res.data.data.organization
                    that.researcher.papercount=res.data.data.paperCount
                    that.researcher.index=res.data.data.index
                    that.researcher.info=res.data.data.info
                    that.researcher.citation=res.data.data.citation


                axios.post('researcher/paper?AuthorName='+that.researcher.name).then (function(res)
                {
                    that.doc_table=res.data.data
                   
                }).catch(function (error)
                {
                    console.log(error)
                })

                axios.post('researcher/yearPub/'+that.researcher.name).then (function(res)
                {
                   var year =[]
                   var num =[]
                   var obj=[]

                   for(var i=0;i<res.data.data.length;i++)
                   {
                       year.push(res.data.data[i].year)
                       num.push(res.data.data[i].pubCount)
                       obj.push(res.data.data[i])
                   }
                   obj.sort(function(a,b){return a.year-b.year})
                 //                         alert(obj.length)
              /*
              for(var i=0;i<obj.length;i++)
                   {

                     alert(obj[i].year)
                   }
                   */
                for(var i=0;i<obj.length;i++)
                {
                                           year.push(res.data.data[i].year)
                       num.push(res.data.data[i].pubCount)
                }
           //        alert(that.zhe_option.series[0].data)
                   that.zhe_option.xAxis[0].data=year
                   that.zhe_option.series[0].data=num
  //  that.myEcharts();
      //                             alert(1+that.zhe_option.xAxis[0].data)
                }).catch(function (error)
                {
                    console.log(error)
                })//饼图
                 //               alert(that.zhe_option.xAxis[0].data)
/*
                 axios.post('researcher/fieldPub/'+that.researcher.name).then (function(res)
                {
                   var filed=[]
                   var num=[]//值-name数组
                   for(var i=0;i<res.data.length;i++)
                   {
                       var now=new Object()
                       now.value=res.data[i].paperCount
                       now.name=res.data[i].name
                       num.push(now)
                       filed.push(res.data[i].filed)
                   }
                   that.pie_option.legend.data=filed
                   that.pie_option.series[0].data=num
                  
                   
                }).catch(function (error)
                {
                    console.log(error)
                })
                */


               
                axios.post('/researcher/relation/'+that.$route.params.id).then(function(res)
                {
                    
                //    alert(that.f_option.series[0].data[0].name)
                    var dataa=[]
                    var linkk=[]
                    for(var i=0;i<res.data.data.nodes.length;i++)
                    {
                 //       if(i==0)
                   //     {
                     //        dataa.push({'category':'学者','name':res.data.data.edges[i].source,'value':1})
                       // }
                        dataa.push({'category':'学者','name':res.data.data.nodes[i].name,'value':1})
                    }
  //                  alert(dataa[0].value)
                    that.f_option.series[0].data=dataa

                    for(var i=0;i<res.data.data.edges.length;i++)
                    {
                       linkk.push({'source':res.data.data.edges[i].source,'target':res.data.data.edges[i].target})
                    }
                //    alert(linkk.length)
                    that.f_option.series[0].links=linkk
             /*       for(var i=0;i<linkk.length;i++)
                    {
                        alert(i+linkk[i].source+linkk[i].target)

                    }
                    */
                                    //    alert('d'+dataa.length)
                                    //    alert(linkk.length)
                               that.myEcharts();

                }).catch(function(err)
                {
                    console.log(err)
                })


                
                })
          //  alert(that.researcher.name);
           //     alert(this.researcher.name)

              

            },
            get_user_info () {
                var _this=this;
                _this.userL = JSON.parse(sessionStorage.getItem("userL"));
                _this.userid = _this.userL.id
                //axios.post('/message/sys?user=" + id)

                axios.post("/user/getUser?id=" + _this.userid)
                    .then(function (response) {
                        console.log(response.data)
                        _this.form = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })


                return 0
            },
             follow(){
      var _this = this;
      axios.post("http://127.0.0.1:8081/follow/insertFollow", {
          user: JSON.parse(sessionStorage.getItem("userL")).id,
          researcher: _this.$route.params.id
      })
              .then(function (response) {
                if (response.data.status === 200) {
                  _this.$message({
                    message: "关注成功",
                    type: "success",
                  });
                  _this.reload();
                  _this.canFollow = false;
                  _this.canCancelFollow = true;
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },
    getFollow(){
        if (sessionStorage.getItem('userL') === null) {
          this.canFollow = false;
          this.canCancelFollow = false;
        } else {
          var _this = this;
          axios.post("http://127.0.0.1:8081/follow/getStatus?user=" + JSON.parse(sessionStorage.getItem("userL")).id + "&researcher=" + _this.$route.params.id)
                  .then(function (response) {
                    if (response.data.status === 200) {
                      console.log("用户id：" + JSON.parse(sessionStorage.getItem("userL")).id);
                      console.log("学者id：" + _this.scholarid);
                      console.log("关注状态： " + response.data.data);
                      console.log("关注状态： " + response.data.msg);
                      if (response.data.data === 0) {
                        _this.canFollow = true;
                        _this.canCancelFollow = false;
                      } else {
                        _this.canFollow = false;
                        _this.canCancelFollow = true;
                      }
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
        }
    },
    cancelFollow(){
      var _this = this;
      axios.post("http://127.0.0.1:8081/follow/cancel?user=" + JSON.parse(sessionStorage.getItem("userL")).id + "&researcher=" + _this.$route.params.id)
              .then(function (response) {
                if (response.data.status === 200) {
                  _this.$message({
                    message: "取消关注成功",
                    type: "success",
                  });
                  _this.reload();
                  _this.canFollow = true;
                  _this.canCancelFollow = false;
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },

            handleAvatarSuccess(res, file) {
                this.imageUrl = res.avatar
                //this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            toIdentify(){
                this.dialogFormVisible3 = true

            },
            sendMessage() {
                this.dialogFormVisible2 = true
            },
            viewMessage(item){
                let postData = {
                    'Mid': item.id
                }
                this.$axios.post('/message/read', postData).then((response) => {
                    for(let i = 0; i < this.message.length; i++){
                        if(message[i].id === response.data.id){
                            this.select = i;
                            break;
                        }
                    }
                    this.message[select].isread = 1;//改变已读状态
                    this.dialogFormVisible = true;
                })

                this.$axios({//将新的状态返回
                    method:'post',
                    url:'/message/read',
                    data:{
                        Mid: item.id
                    }
                }).catch(err=>{console.log(err)})


            },
            submitReply() {
                this.$axios({//将回复内容返回
                    method:'post',
                    url:'/message/response',
                    data:{
                        from: item.from,
                        text: this.reply
                    }
                }).catch(err=>{console.log(err)})
                this.dialogFormVisible = false;
            },
            submitSend() {
                this.$axios({//将发送内容返回
                    method:'post',
                    url:'/message/send',
                    data:{
                        to: this.send_message.to,
                        text: this.send_message.text
                    }
                }).catch(err=>{console.log(err)})
                this.dialogFormVisible2 = false;
            },
            submitIdentify() {
                this.$axios({//将发送内容返回
                    method:'post',
                    url:'',
                    data:{

                    }
                }).catch(err=>{console.log(err)})
                this.dialogFormVisible3 = false;
            },
            Submit(){
                this.editing=false;
                let postData = {
                    'id': parseInt(this.$store.state.userID),
                    'name': this.form.name,
                    'email': this.form.email,
                    'info': this.form.info
                }
                this.$axios.post('/api/user/edit', postData).catch(err=>{console.log(err)})
                this.get_user_info()
            }



        },

    }

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-divider--vertical {
  height: 700px;
}
/* el-divider 修改高度&虚线效果 */
.el-divider--horizontal {
  margin: 12px 3px;
  border-top: 1px dashed #e8eaec;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
