<template>
  <div>
    <div v-title="'志愿者招募'"></div>
    <div class="input-wrapper">
      <input type="text" class="search-input" placeholder="请输入招募信息名称" v-model="key">
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/search-title.png'" alt=""
           class="input-title" @click="goSearch">
    </div>
    <div class="header-top">
      <div class='first-div' :class="isActivity=='new_recruit'||'is-activity'" @click="isActivity='new_recruit'">最新招募
      </div>
      <!--<div class='second-div' :class="isActivity=='line'||'is-activity'" @click="isActivity='line'">线上招募</div>-->
      <div class='second-div' :class="isActivity=='city_recruit'||'is-activity'" @click="isActivity='city_recruit'">同城志愿</div>
      <div class='third-div' :class="isActivity=='line'||'is-activity'" @click="isActivity='line'">线上招募</div>
    </div>

    <div class="content-address">
      <sy-tab-container v-model="isActivity">
        <sy-tab-container-item id="new_recruit">
          <div v-show="listsNew.length===0">
            <img src="../../../static/image/volunteer/zhaomu.png" alt="" class="noData">
            <p class="unInfo">暂无最新招募</p>
          </div>
          <mt-loadmore v-show="listsNew.length!==0" :top-method="loadTop" @translate-change="translateChange"
                       @top-status-change="handleTopChange" ref="loadmore1">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'"
                    :class="{ 'is-rotate': topStatus === 'drop' }">
                <!--<img :src="imgList[0]" alt="" style="vertical-align: middle;">-->{{topStatus === 'drop' ? '释放刷新' : '下拉刷新'}}
              </span>
              <span v-show="topStatus === 'loading'">
                      <img :src="imgList[index]" alt="" ref="new_recruit">
                  </span>
            </div>
            <div class="content-div">
              <div v-for="item in listsNew" class="list-wrapper"
                   @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id+'&is_share='+share)">
                <div class="title-wrapper">
                  <div class="title-div" :class="!(item.recruit_state==1||item.recruit_state==0)||'has-width'">
                    {{item.recruit_name}}
                  </div>
                  <span v-show="item.recruit_state==1||item.recruit_state==0"
                        class="recruit-img"
                        :class="{'recruit-img-blue':item.recruit_state==0}">{{getState(item.recruit_state)}}</span>
                </div>
                <span class="address no-enter">{{ item.offline_flag != 1 ? item.city + item.area : '线上'}}</span><span
                  class='time'>{{item.add_time}}</span>
                <div class="descript">{{item.summary}}</div>
                <div class="name-wrapper">
                  <img :src="item.avatar" alt="" class="img-name">{{item.volunteer_org_name}}
                </div>
              </div>
            </div>
          </mt-loadmore>
        </sy-tab-container-item>
        <sy-tab-container-item id="line">
          <div v-show="listsHot.length===0">
            <img src="../../../static/image/volunteer/zhaomu.png" alt="" class="noData">
            <p class="unInfo">暂无线上招募</p>
          </div>
          <mt-loadmore v-show="listsHot.length!==0" :top-method="loadTop" @translate-change="translateChange"
                       @top-status-change="handleTopChange" ref="loadmore2">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'"
                    :class="{ 'is-rotate': topStatus === 'drop' }">{{topStatus === 'drop' ? '释放刷新' : '下拉刷新'}}</span>
              <span v-show="topStatus === 'loading'">
                <img :src="imgList[index]" alt="" ref="line">
              </span>
            </div>
            <div class="content-div">
              <div v-for="item in listsHot" class="list-wrapper"
                   @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id+'&is_share='+share)">
                <div class="title-wrapper">
                  <div class="title-div" :class="!(item.recruit_state==1||item.recruit_state==0)||'has-width'">
                    {{item.recruit_name}}
                  </div>
                  <span v-show="item.recruit_state==1||item.recruit_state==0"
                        class="recruit-img"
                        :class="{'recruit-img-blue':item.recruit_state==0}">{{getState(item.recruit_state)}}</span>
                </div>
                <span class="address no-enter">{{ item.offline_flag != 1 ? item.city + item.area : '线上'}}</span><span
                  class='time'>{{item.add_time}}</span>
                <div class="descript">{{item.summary}}</div>
                <div class="name-wrapper">
                  <img :src="item.avatar" alt="" class="img-name">{{item.volunteer_org_name}}
                </div>
              </div>
            </div>
          </mt-loadmore>
        </sy-tab-container-item>
        <sy-tab-container-item id="city_recruit">
          <!--<div v-show="listsCity.length===0&&!localIsDone" style="position: relative">-->
          <div v-show="listsCity.length===0" style="position: relative">
            <img src="" alt="" ref="loadingP">
            <p style="width: 2rem;text-align: left;left: 50%;margin-left: -1rem;position: relative;color:#ddd">
              {{loadingData[indexP]}}</p>
          </div>
          <div v-show="listsCity.length===0&&isShow">
            <img src="../../../static/image/volunteer/zhaomu.png" alt="" class="noData">
            <p class="unInfo">暂无同城招募</p>
          </div>
          <div v-show="!isShow&&cityLoading">
            <img src="../../../static/image/volunteer/zhaomu.png" alt="" class="noData">
            <p class="unInfo">数据加载中</p>
          </div>
          <!--<mt-loadmore v-show="listsCity.length!==0&&localIsDone" :top-method="loadTop"-->
          <mt-loadmore v-show="listsCity.length!==0" :top-method="loadTop"
                       @translate-change="translateChange"
                       @top-status-change="handleTopChange" ref="loadmore3">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'"
                    :class="{ 'is-rotate': topStatus === 'drop' }">{{topStatus === 'drop' ? '释放刷新' : '下拉刷新'}}</span>
              <span v-show="topStatus === 'loading'">
                <img :src="imgList[index]" alt="" ref="city">
              </span>
            </div>
            <div class="content-div">
              <div v-for="item in listsCity" class="list-wrapper"
                   @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=recruit_detail&recruit_id='+item.recruit_id+'&is_share='+share)">
                <div class="title-wrapper">
                  <div class="title-div" :class="!(item.recruit_state==1||item.recruit_state==0)||'has-width'">
                    {{item.recruit_name}}
                  </div>
                  <span v-show="item.recruit_state==1||item.recruit_state==0"
                        class="recruit-img"
                        :class="{'recruit-img-blue':item.recruit_state==0}">{{getState(item.recruit_state)}}</span>
                </div>
                <span class="address no-enter">{{ item.offline_flag != 1 ? item.city + item.area : '线上'}}</span><span
                  class='time'>{{item.add_time}}</span>
                <div class="descript">{{item.summary}}</div>
                <div class="name-wrapper">
                  <img :src="item.avatar" alt="" class="img-name">{{item.volunteer_org_name}}
                </div>
              </div>
            </div>
          </mt-loadmore>
        </sy-tab-container-item>
      </sy-tab-container>
    </div>
  </div>
</template>

<script>
  import { Loadmore,MessageBox } from 'mint-ui'

  export default {
    data () {
      return {
        cityLoading:true,
        isActivity: 'new_recruit',
        key: '',
        getDataDone: true,
        page: {
          first: 1,
          second: 1,
          third: 1
        },
        curpage: 1,
        curCity: '',
        city: '',
        listsNew: [],
        listsCity: [],
        listsHot: [],
        topStatus: false,
        index: 0,
        imgList: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAyCAYAAAD7oU3dAAAACXBIWXMAAAsSAAALEgHS3X78AAAAeElEQVRo3u3a0QnAIAxAQSOu0YVcprO4jAs5SDqC/Wmh5d4CgSP5EIzMLNpXEYACBQoUKFACBQoUqO/Unh7Qx3rlMTnPI2yU0wMFCpRAgQIFChQogQIFChQoUKAEChQoUKBAgdKNwq9gGwUKFChQoAQKFChQoH7XBSEvCl/Ut5CpAAAAAElFTkSuQmCC',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAyCAYAAAD7oU3dAAAACXBIWXMAAAsSAAALEgHS3X78AAADKElEQVRo3u1aMW6jQBR9E20/vgAKN7BbKjutm80RjEQPF0Ah4gKmtwS+gbehXbuiDLmBIy4QTsAW/lG8DhiGeAgjza9sw3xmnv9/vHnAqqqCjva40xBooDRQGigNlAZKA6Xj//g15MWYk5kAHgFMACTVxjqKjF9GhQlgBeAdwC51jeNgcx9CcDInmwDwADxdHLKrjZV0BGkFIL74+RnAOnWNd+WBYk62ArAGwGsOlwDMamO9t4A0AXC8ksNLXSORuY47iQAtmJPlVAW84TROILbFuiVHvIyKfBkVC6UqijnZGoArMOSh2lj7hmpaAPgrkCtKXcMbfUUxJwsEQQKAoOexunCXURGo0Hp9yn9OXFZH4POB5qCMjgro7nhO4MFYJicDqH3PcfeksT7ikX4bcg6DArUG8NZzrNnwWSTeOt5JfxYo0kR9W+bY8FmohWUIUGmCkznZXpCIX6uNNbsg8xzAVCDHIXUNKVpKJpl3raoSwPMlSACQusaMtinlja85HqBIQG5bTtvSFqZxgalrBMRXrblS19jLWo/UvR65BXnN9uMAwKs2Vi7oHsyIqOc1VTmT6SYMsSmeUUv8JoCSro5Bi5PwIUb/EIHnUtehn+upp8xHHdIdTuYXX1sv/J53FGfll9azLa5u6zG/uE7moRivxFl5lcxtix9Vbb0A9YbbHMAL84uE+cWkA0CTOCsTAC8NIpbL3kDLU+Z+Z8OtBLCuQiNoACnAyW/nHXI92Bbfq1ZRXf9hDuCJ+UVeA1KO0wMJfuNrjgMo5hcriBtuUxp3TthTwRxzGjd+oIhz+v6zt7BZgjgrJypUlIf+htstbJZ7msPogeprc7wB2J1936G/AbhQAaje5F+Fn4abbfHvGIBKkHmf2/OhTq3bFk9InA4xh2GBIj0U3VBKiFZVZFs8UKL1qtDwADwAeO1w+rYKmw03EpDbDnleSXB6MtYk3486aaPrL2mE1x8G0O3+eCWHR22qrs1C3GPi5H1/kRJtIJ0Re12lPAMwZYM0SEXVuAmfL5KFYtZtnJUmzl4kk+kW/ChQKod2ODVQGigNlAZKA6WB0nER/wD3bjZygkS3rgAAAABJRU5ErkJggg==',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAyCAYAAAD7oU3dAAAACXBIWXMAAAsSAAALEgHS3X78AAACwklEQVRo3u2aPa7aQBDH/45SIuACVggXgNdQ0DyndRPfIPYJ7AsgIfkC9gmec4JQuTZNCprABQhPe4FHRO80WyD0sNnd8YeeZkrj8ez+PDM7M8YqyxIs9fKJETAoBsWgGBSDYlAsDEpLPlM/0FqJOQDv6lJRxnbR5CZefv9zADhXlzbBcrgn3RdVZW6txBjABsDzOz9vAaypgUlA6wqbXrAcvvUGlIRUAJjV3JqWsR0RQUoAhDW3HQA4FLCoclT0ACQACK2VSFqCBLmmqBceZa3EBMAewEhB7WsZ2ydNSBMAfxVUzgDmwXJ46tqj1oqQAMA3sKeqO5Jr7Dz0nJZ0urJHBuqLho5Jcn1raY3koF41dEzKhKKlNZKDUl34GUBmYC+Tz2jrxZAmcxVJytjWDj1ZEyUNr5EelDzmA4UQSAheTqIQToFpaUBWcJaxnQF4km1DVch5Jt5041VeTQhuATwFy2FGsUeL+iuMtRL+TaX+KnvANQWkm+JzLMPKuzrZDgASKkCNgfqowvMoBsWgOhHyCaebirFM5v5Ngs3y0E4obe2Ol7vJfDEd9DeZu6nwZI1zr7c6AHDy0Pz02x0vc1lxjyrKg2gxHex7FXpuKjIAv2oa0Jlh+3LtSRtUj3eeAfzZHS9+b0C5qfAB/Hjw9u9uKkzHHpHCROBld7xM+uJRyv2eoTdFDa+PHpSbignU5z0zNxVzTZM+1CeqTh88StetnRb1ejG40z1Vxi3qdT+4k0f9QUO10DRZtGir82R+zkPtr8aq5cUZPfkKgzy0N6ieRb2XkLVkMR2cAKQqJ6zU6U2vF6F+ln0GEEiwMIAVPQjrAJqJKh2oPLT38kS6lzh/ApjnoU3Sg0lY3yo8eQvAWUwH/fmTxp2e77pOyvLQPqEh2R0vzk3ZsKHq8RoF9RGF51EMikExKAbFoBgUC4PSk/81TOdLscUr2wAAAABJRU5ErkJggg==',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAyCAYAAAD7oU3dAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVRo3u2asY7aQBCGP6IrkeABkDBI1EdFa79BCO0V8b0BbwC8AXmCmIL2RN7AbtOEq5ECSDwASOlJM0iXBM67zlrr081IbvDYO/vtz3pm7Nr5fEYt3z4oAgWloBSUglJQCkrtT7srctEsow9EQFN+SichaRUn+P3nr0hiBTgC6aBbX9vep2aTcM4yAiABwiun90BcFWACKAHaV05nQDzo1nfOQYmKUqCR4/o4CUk8Q4qBrzluJyAyVZfNHrUygAQwF+X5ghQAcwPXhszJ3WY+y4hvSPhWAFOPgpoaLihAW9TnTFFDy2CHHkGVEqspqKbl4A2PoGzHbroEpQmnod/R8r4nj3OyHfvoEtTKcvCVR1ClxGoESvKiZ4sV9f3UM1XV86BbT1wqCiA2COAk2fnOFyXJto1jdV4UT0LWQAAsbrhkQDQJvf7tLrBWUt9lN1wWQGBT89WKvFyQzLsvxw5YC8gqFsWXOANgDaxtarz/AqXpgZqCUlAKqlp29x4mudke+lL87nqdVqEcr/BT7+GJfx67y5G/RPMKnCYwluNlR2EPTHudVlIqKAE053rffAGMlyPrIroMBa14vdmYAcNep+W0KL5AioEfNyABfAZ2D0/+WsGipIT8jmwofm43c5m88150CTYG7g19P262h8i1oqaYdw/vRX0+LC7D3wbUW+mbty39A9egSulFa8L5jjPzUnrRJdg3S/+Va1BvpW8+t1z8xDWoqYXvfjny8/1Br9NKgS+mqYTzhFPKk0fDVfL5pphepzUGZjkxfrIpY4qUMBE5n9NUpebbbA+BLNrwxb6ZAompklwUxRF/faC1HFWzb+7CtGeueZSCUlAKSkEpKDUFVcx+A64byF9hnB+EAAAAAElFTkSuQmCC',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAyCAYAAAD7oU3dAAAACXBIWXMAAAsSAAALEgHS3X78AAABg0lEQVRo3u3YwW3CMBTG8T9VB2CDMkHIAJHsEUAM0LIBhwzAADl0A+gAkRghlhgAmIBuwAbpxYdWCjgOPcTS924QJ7Z/cvyeM2nbFkU4XkQgKEEJSlCCEpRCUIISlKAEJShBKQQlKEGNL15DDUqHBaz/eQWaynBNedKr42Xm5zTzfzV1kTWP7pnc+xRcOhbAJ/DWcfkL2FSGW2JAUz+n947L38CmLrJDb6jS8QHsAv2eAZsKlkdqgHmg6bousn1wj/Kv2q5H33PgkNCCOvRAAtitjhfbZzPfRnRuPOzYV5MFTMQt24dQpWMa+UCARQKrKXaMJrSi8gGDyBOAygeuQtVRzxacpwHPOCUwz6fn9QfKp3o3IJukkPFiwtVFdvvPrOcqQzN2JV91xyyAbbA88BNf93jYOZGM9zvznXu0W3cdZzo388qwB5a+rOfOEcamdITxr5L1Y+fOEWbZVZU/POvpUBwJpVAdJShBCUpQghKUQlCCEpSgBCUoQSkEJShBjTZ+ABaTal2hNzPOAAAAAElFTkSuQmCC',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAyCAYAAAD7oU3dAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVRo3u2asY7aQBCGP6IrkeABkDBI1EdFa79BCO0V8b0BbwC8AXmCmIL2RN7AbtOEq5ECSDwASOlJM0iXBM67zlrr081IbvDYO/vtz3pm7Nr5fEYt3z4oAgWloBSUglJQCkrtT7srctEsow9EQFN+SichaRUn+P3nr0hiBTgC6aBbX9vep2aTcM4yAiABwiun90BcFWACKAHaV05nQDzo1nfOQYmKUqCR4/o4CUk8Q4qBrzluJyAyVZfNHrUygAQwF+X5ghQAcwPXhszJ3WY+y4hvSPhWAFOPgpoaLihAW9TnTFFDy2CHHkGVEqspqKbl4A2PoGzHbroEpQmnod/R8r4nj3OyHfvoEtTKcvCVR1ClxGoESvKiZ4sV9f3UM1XV86BbT1wqCiA2COAk2fnOFyXJto1jdV4UT0LWQAAsbrhkQDQJvf7tLrBWUt9lN1wWQGBT89WKvFyQzLsvxw5YC8gqFsWXOANgDaxtarz/AqXpgZqCUlAKqlp29x4mudke+lL87nqdVqEcr/BT7+GJfx67y5G/RPMKnCYwluNlR2EPTHudVlIqKAE053rffAGMlyPrIroMBa14vdmYAcNep+W0KL5AioEfNyABfAZ2D0/+WsGipIT8jmwofm43c5m88150CTYG7g19P262h8i1oqaYdw/vRX0+LC7D3wbUW+mbty39A9egSulFa8L5jjPzUnrRJdg3S/+Va1BvpW8+t1z8xDWoqYXvfjny8/1Br9NKgS+mqYTzhFPKk0fDVfL5pphepzUGZjkxfrIpY4qUMBE5n9NUpebbbA+BLNrwxb6ZAompklwUxRF/faC1HFWzb+7CtGeueZSCUlAKSkEpKDUFVcx+A64byF9hnB+EAAAAAElFTkSuQmCC',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAyCAYAAAD7oU3dAAAACXBIWXMAAAsSAAALEgHS3X78AAACwklEQVRo3u2aPa7aQBDH/45SIuACVggXgNdQ0DyndRPfIPYJ7AsgIfkC9gmec4JQuTZNCprABQhPe4FHRO80WyD0sNnd8YeeZkrj8ez+PDM7M8YqyxIs9fKJETAoBsWgGBSDYlAsDEpLPlM/0FqJOQDv6lJRxnbR5CZefv9zADhXlzbBcrgn3RdVZW6txBjABsDzOz9vAaypgUlA6wqbXrAcvvUGlIRUAJjV3JqWsR0RQUoAhDW3HQA4FLCoclT0ACQACK2VSFqCBLmmqBceZa3EBMAewEhB7WsZ2ydNSBMAfxVUzgDmwXJ46tqj1oqQAMA3sKeqO5Jr7Dz0nJZ0urJHBuqLho5Jcn1raY3koF41dEzKhKKlNZKDUl34GUBmYC+Tz2jrxZAmcxVJytjWDj1ZEyUNr5EelDzmA4UQSAheTqIQToFpaUBWcJaxnQF4km1DVch5Jt5041VeTQhuATwFy2FGsUeL+iuMtRL+TaX+KnvANQWkm+JzLMPKuzrZDgASKkCNgfqowvMoBsWgOhHyCaebirFM5v5Ngs3y0E4obe2Ol7vJfDEd9DeZu6nwZI1zr7c6AHDy0Pz02x0vc1lxjyrKg2gxHex7FXpuKjIAv2oa0Jlh+3LtSRtUj3eeAfzZHS9+b0C5qfAB/Hjw9u9uKkzHHpHCROBld7xM+uJRyv2eoTdFDa+PHpSbignU5z0zNxVzTZM+1CeqTh88StetnRb1ejG40z1Vxi3qdT+4k0f9QUO10DRZtGir82R+zkPtr8aq5cUZPfkKgzy0N6ieRb2XkLVkMR2cAKQqJ6zU6U2vF6F+ln0GEEiwMIAVPQjrAJqJKh2oPLT38kS6lzh/ApjnoU3Sg0lY3yo8eQvAWUwH/fmTxp2e77pOyvLQPqEh2R0vzk3ZsKHq8RoF9RGF51EMikExKAbFoBgUC4PSk/81TOdLscUr2wAAAABJRU5ErkJggg==',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAyCAYAAAD7oU3dAAAACXBIWXMAAAsSAAALEgHS3X78AAADKElEQVRo3u1aMW6jQBR9E20/vgAKN7BbKjutm80RjEQPF0Ah4gKmtwS+gbehXbuiDLmBIy4QTsAW/lG8DhiGeAgjza9sw3xmnv9/vHnAqqqCjva40xBooDRQGigNlAZKA6Xj//g15MWYk5kAHgFMACTVxjqKjF9GhQlgBeAdwC51jeNgcx9CcDInmwDwADxdHLKrjZV0BGkFIL74+RnAOnWNd+WBYk62ArAGwGsOlwDMamO9t4A0AXC8ksNLXSORuY47iQAtmJPlVAW84TROILbFuiVHvIyKfBkVC6UqijnZGoArMOSh2lj7hmpaAPgrkCtKXcMbfUUxJwsEQQKAoOexunCXURGo0Hp9yn9OXFZH4POB5qCMjgro7nhO4MFYJicDqH3PcfeksT7ikX4bcg6DArUG8NZzrNnwWSTeOt5JfxYo0kR9W+bY8FmohWUIUGmCkznZXpCIX6uNNbsg8xzAVCDHIXUNKVpKJpl3raoSwPMlSACQusaMtinlja85HqBIQG5bTtvSFqZxgalrBMRXrblS19jLWo/UvR65BXnN9uMAwKs2Vi7oHsyIqOc1VTmT6SYMsSmeUUv8JoCSro5Bi5PwIUb/EIHnUtehn+upp8xHHdIdTuYXX1sv/J53FGfll9azLa5u6zG/uE7moRivxFl5lcxtix9Vbb0A9YbbHMAL84uE+cWkA0CTOCsTAC8NIpbL3kDLU+Z+Z8OtBLCuQiNoACnAyW/nHXI92Bbfq1ZRXf9hDuCJ+UVeA1KO0wMJfuNrjgMo5hcriBtuUxp3TthTwRxzGjd+oIhz+v6zt7BZgjgrJypUlIf+htstbJZ7msPogeprc7wB2J1936G/AbhQAaje5F+Fn4abbfHvGIBKkHmf2/OhTq3bFk9InA4xh2GBIj0U3VBKiFZVZFs8UKL1qtDwADwAeO1w+rYKmw03EpDbDnleSXB6MtYk3486aaPrL2mE1x8G0O3+eCWHR22qrs1C3GPi5H1/kRJtIJ0Re12lPAMwZYM0SEXVuAmfL5KFYtZtnJUmzl4kk+kW/ChQKod2ODVQGigNlAZKA6WB0nER/wD3bjZygkS3rgAAAABJRU5ErkJggg==',
        ],
        localIsDone: false,
        timer: '',
        timerP: '',
        indexP: '',
        loadingData: ['数据加载中', '数据加载中', '数据加载中。', '数据加载中。', '数据加载中。。', '数据加载中。。', '数据加载中。。。', '数据加载中。。。'],
        isShow: false,
        isNativeLocation:false,
        lng:'',
        lat:'',
        share:''
      }
    },
    created () {
      this.share = this.$route.query.is_share?'yes':''
      this.isActivity = this.$route.query.tab_index == '3' ? 'line' : this.$route.query.tab_index == '2' ? 'city_recruit' : 'new_recruit'
      window.addEventListener('scroll', this.handleScroll)
      this.getUp()
    },
    computed: {},
    watch: {
      isActivity: function () {
        clearInterval(this.timer)
        this.getDataDone = true
        switch (this.isActivity) {
          case 'new_recruit':
            if(this.listsNew.length===0){
              this.getData()
            }
            break
          case 'line':
            if(this.listsHot.length===0){
              this.getData()
            }
            break
          case 'city_recruit':
//            console.log(1,'----city')
            var that = this
//            that.isShow=true

//            that._appjs.syJsbCheckLocationPermission()
//            if(sessionStorage.volunteer){
//              that.city=sessionStorage.volunteer
            if(sessionStorage.lng){
              that.lng=sessionStorage.lng
              that.lat=sessionStorage.lat
              that.getData('isCity')
            }else{
              if(!this.city&&!this.localIsDone){
                if(this.isNativeLocation){
                  this._appjs.syJsbLocationInfo('setAppLocationInfo')
                }else{
                  this.getQqLocation()
                }

              }
            }
            //this.isShow=true
            break
        }
      }
    },
    mounted () {
      this.getVersion((platform,version)=>{
        this.isNativeLocation =  (platform === 'android' && version > 103) || (platform === 'ios' && version > 88)
      })
      var _this = this
      window.setAppLocationInfo = function (data){
        if(!data) {
          console.log(1)
          this.getQqLocation()
          return
        };
        _this._appjs.syJsbGetAppInfo(function (appInfo){
          console.log(2)
          if(!appInfo){
            return false;
          }
          var platform=appInfo.split("|")[1];
          var json_data;
          if(platform=='ios'){
            json_data = eval('(' + data + ')');
          }else if(platform=='android'){
            json_data = data
          }
          console.log(3)
          _this.localIsDone=true
//          _this._appjs.syJsbAlert(JSON.stringify(json_data));
          sessionStorage.volunteer = _this.city = json_data.city;
          sessionStorage.lng = _this.lng = json_data.longitude;
          sessionStorage.lat = _this.lat = json_data.latitude;
          _this.getData('isCity')
          _this.isShow=false
        });

      }
    },
    methods: {
      getUp(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_volunteer_updating').then(res=>{
          if(res.data.code == 701){
            window.location.href= this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=is_updating'
          }else{
           if(this.isActivity==='new_recruit'){
              this.getData()
            }
          }
        })
      },
      loadingImg () {
        var that = this
        clearInterval(this.timer)
        that.index = 0
        this.timer = setInterval(function () {
          that.$refs[that.isActivity].src = that.imgList[that.index++]
          if (that.index > 7) that.index = 0
        }, 100)
      },
      getState (state) {
        var str = '招募未开始'
        switch (state) {
          case '0':
            str = '未开始'
            break
          case '1':
            str = '招募中'
            break
          case '2':
            str = '招募已结束'
            break
          case '3':
            str = '招募已取消'
            break
          case '4':
            str = '活动已结束'
            break
        }
        return str
      },
      handleTopChange (status) {
        if (status == 'loading') {
          this.loadingImg()
        }
        this.topStatus = status
      },
      translateChange (translate) {
      },
      goSearch () {
        this._appjs.syJsbLaunchWebview(this.siteInfo.host + '/mobile/index.php?act=volunteer_router&op=vol_goods_list&key=' + this.key + '&type=index_recent_recruit&is_share='+this.share)
      },
      loadTop () {
        switch (this.isActivity) {
          case 'new_recruit':
            this.page.first = 1
            break
          case 'line':
            this.page.second = 1
            break
          case 'city_recruit':
            this.page.third = 1
            break
        }
        this.getData('search')
      },
      handleScroll () {
        var offsetHeight = document.body.scrollHeight
        var clientHeight = document.body.clientHeight
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        if (offsetHeight - clientHeight - scrollTop <= 50 && this.getDataDone) {
          this.getDataDone = false
          switch (this.isActivity) {
            case 'new_recruit':
              this.page.first++
              break
            case 'line':
              this.page.second++
              break
            case 'city_recruit':
              this.page.third++
              break
          }
          this.getData()
        }

      },
      curPageFn () {
        this.curpage = this.page.first
        this.curCity = ''
        switch (this.isActivity) {
          case 'new_recruit':
            this.curpage = this.page.first
            this.curCity = ''
            break
          case 'line':
            this.curpage = this.page.second
            this.curCity = ''
            break
          case 'city_recruit':
            this.curpage = this.page.third
            this.curCity = this.city
            break
        }
      },
      getData (flag) {
        this.curPageFn()
        clearInterval(this.timerP)
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=index_recent_recruit&order=' + this.isActivity + '&recruit_name=&curpage=' + this.curpage + '&city=' + this.curCity +'&lng='+this.lng+'&lat='+this.lat
        this.$http.get(url).then((res) => {
          if (res.data.code === 200 && res.data.content.length !== 0) {
            if(flag==='isCity'){
              this.cityLoading = false
              this.listsCity = res.data.content
              return;
            }
            switch (this.isActivity) {
              case 'new_recruit':
                this.listsNew = this.listsNew.concat(res.data.content)
                if (flag === 'search') {
                  this.listsNew = res.data.content
                }
                this.$nextTick(function () {
                  this.listsNew.length === 0 || this.$refs.loadmore1.onTopLoaded()
                })
                break
              case 'line':
                this.listsHot = this.listsHot.concat(res.data.content)
                if (flag === 'search') {
                  this.listsHot = res.data.content
                }
                this.$nextTick(function () {
                  this.listsHot.length === 0 || this.$refs.loadmore2.onTopLoaded()
                })
                break
              case 'city_recruit':
                this.listsCity = this.listsCity.concat(res.data.content)
                if (flag === 'search') {
                  this.listsCity = res.data.content
//                  console.log('listCity2',this.listsCity)
                }
                this.$nextTick(function () {
                  this.listsCity.length === 0 || this.$refs.loadmore3.onTopLoaded()
                })
                break
            }
            clearInterval(this.timer)
            this.getDataDone = true
          } else {
          }
        }, (error) => {
          switch (this.isActivity) {
            case 'new_recruit':
              this.$refs.loadmore1.onTopLoaded()
              break
            case 'line':
              this.$refs.loadmore2.onTopLoaded()
              break
            case 'city_recruit':
              this.$refs.loadmore3.onTopLoaded()
              break
          }
          this.$toast('联网失败，请检查手机网络')
        })
      },
      getVersion(fn){
        let info = this._appjs.syJsbGetAppVersion()
        if (info['platform'] === 'android') {
          fn(info['platform'],info['version'])
        }
        if (info['platform'] === 'ios') {
          info['version'].then( version => {
            fn(info['platform'],version)
          })
        }
      },
      getQqLocation(){
        var that = this;
        var options = {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        };
        that._appjs.syJsbCheckLocationPermission()
        if ('geolocation' in navigator) {
          if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
              that.localIsDone=true
              that.isShow=false
//              var geocoder = new qq.maps.Geocoder({
//                complete: function (result) {
//                  that.city = result.detail.addressComponents.city
//                  sessionStorage.volunteer=that.city
//                  that.getData('isCity')
//                }
//              })

              sessionStorage.lng = that.lng = position.coords.longitude
              sessionStorage.lat = that.lat = position.coords.latitude

              that.getData('isCity')
//              var coord = new qq.maps.LatLng(position.coords.latitude, position.coords.longitude)
//              geocoder.getAddress(coord)
            },function (err) {
              if (that.city != '') {
                return
              } else {
                that.listsCity = []
                that.$refs.loadmore3.onTopLoaded()
                that.localIsDone = true
                that.isShow=true
//                 that._appjs.syJsbCheckLocationPermission()
//                      MessageBox.alert('该服务使用位置功能，请在“设置—公益中国—位置“中开启位置权限。','“公益中国”想要使用位置服务').then(action => {
//                      });
              }
            },options)
          } else {
            (function () {
              var geolocation = new qq.maps.Geolocation('IQ4BZ-DO536-5X6SB-M5SH3-VNQGQ-HNBCG', 'sy')
              geolocation.getLocation(function (position) {
                that.city = position.city

              }, function (err) {
                geolocation.getIpLocation(function (p) {
                  that.city = p.city

                }, function (err2) {
                })
              })
            }())
          }
        } else {
          console.log('geolocation IS NOT available')
        }
      }
    },
    components: {}
  }
</script>
<style>
  .mint-loadmore-top img{
    width:0.8rem;
  }
  .mint-msgbox-message{
    line-height: 24px;
  }
</style>
<style lang="scss" scoped>
  .no-enter {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .noData {
    width: 2rem;
    height: 2rem;
    display: inline-block;
    border: 0;
    margin: 2.5rem auto 0.58rem;
  }

  p.unInfo {
    font-size: .32rem;
    color: #B1B8C4;
  }

  .input-wrapper {
    height: 1rem;
    background: #F7F9FA;
    width: 100%;
    position: relative;
    .search-input {
      width: 6.9rem;
      height: 0.7rem;
      margin: 0.16rem 0 0 0.3rem;
      font-size: .28rem;
      background: #FFFFFF;
      border: 0.01rem solid #E9EBEF;
      box-shadow: inset 0.01rem 0.01rem 0.01rem 0 #E9EBEF;
      border-radius: 0.08rem;
      padding-left: 0.3rem;
      box-sizing: border-box;
      float: left;
      font-weight: 300;
      -webkit-appearance: none;
      &::-webkit-input-placeholder {
        color: #DADEE4;
        padding-left: 0.08rem;
      }
    }
    .input-title {
      position: absolute;
      right: 0.5rem;
      cursor: pointer;
      width: 0.34rem;
      height: 0.34rem;
      top: 0.36rem;
    }
  }

  .header-top {
    height: 0.89rem;
    border-bottom: 0.01rem solid #E9EBEF;
    position: relative;
    box-sizing: border-box;
    & > div {
      float: left;
      line-height: 0.9rem;
      height: 0.86rem;
      border-bottom: 0.04rem solid #4A90E2;
      padding: 0 0.2rem;
      font-size: .30rem;
      color: #4A90E2;
      font-weight: normal;
    }
    .is-activity {
      border-bottom: 0;
      color: #4B4F63;
      font-weight: 300;
    }
    .first-div {
      margin-left: 0.6rem;
    }
    .second-div {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .third-div {
      float: right;
      margin-right: 0.6rem;
    }
  }

  .content-address {
    padding: 0 0.1rem;
    .content-div {
      padding-top: 0.39rem;
      margin-bottom: 0.27rem;
      overflow: hidden;
      & > div {
        width: 6.9rem;
        padding: 0.23rem 0.3rem 0.3rem;
        box-sizing: border-box;
        font-weight: 300;
        background: #FFFFFF;
        box-shadow: 0 0 .15rem 0 rgba(74, 144, 226, 0.20);
        border-radius: .08rem;
        margin: 0 auto 0.3rem;
        .list-wrapper {
        }
        .title-wrapper {
          position: relative;
        }
        .title-div {
          font-size: .30rem;
          color: #4B4F63;
          line-height: .42rem;
          text-align: left;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .recruit-img {
          /*width: 0.94rem;*/
          /*height: 0.3rem;*/
          display: inline-block;
          background: #F8E71C;
          /*border-radius: 102.63px 102.63px 102.63px 1.58px;*/
          border-radius: .17rem .17rem .17rem 0;
          font-size: .24rem;
          /*line-height: 0.3rem;*/
          height: .34rem;
          line-height: .38rem;
          padding: 0 .14rem;
          color: #4A90E2;
          position: absolute;
          font-weight: 300;
          right: 0rem;
          top: 0.05rem;
        }
        .recruit-img-blue {
          background: #99C6FC;
          color: #fff;
        }
        .has-width {
          width: 4.4rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .address, .time {
          float: left;
          font-size: .24rem;
          color: #818C9E;
          margin-top: 0.08rem;
          font-weight: 300;
          background: url(../../../static/image/volunteer/vol-address.png) left center no-repeat;
          background-size: .24rem auto;
        }
        .address {
          padding-left: 0.32rem;
          padding-top: .06rem;
          padding-right: 0.49rem;
          border-right: 1px solid #E9EBEF;
          margin-right: 0.49rem;
          display: inline-block;
          max-width: 2.4rem;
        }
        .time {
          padding-top: .06rem;
          padding-left: 0.36rem;
          background: url(../../../static/image/volunteer/vol-time.png) left center no-repeat;
          background-size: .26rem auto;
        }
        .descript {
          overflow: hidden;
          clear: both;
          height: 0.8rem;
          font-weight: 300;
          font-size: .26rem;
          color: #666A7F;
          line-height: .40rem;
          text-align: left;
          padding-top: 0.09rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .name-wrapper {
          padding-top: 0.11rem;
          vertical-align: middle;
          font-size: .24rem;
          color: #818C9E;
          font-weight: 300;
          text-align: left;
          height: 0.4rem;
          line-height: 0.4rem;
          .img-name {
            width: 0.4rem;
            height: 0.4rem;
            float: left;
            border: 0;
            border-radius: 50%;
            margin-right: 0.12rem;
            background: #EBF4FF;
          }
        }
      }
    }
  }
</style>
