<template>
  <div class="top-content">
    <div v-title="'志愿者组织'"></div>
    <div class="input-wrapper">
      <input type="text" class="search-input" placeholder="请输入志愿组织名称" v-model="key">
      <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/search-title.png'" alt=""
         class="input-title" @click="goSearch">
    </div>
    <div class="header-top">
      <div class='first-div' :class="isActivity=='one'||'is-activity'" @click="isActivity='one'">最新入驻</div>
      <div class='second-div' :class="isActivity=='third'||'is-activity'" @click="isActivity='third'">热度最高</div>
      <div class='third-div' :class="isActivity=='two'||'is-activity'" @click="isActivity='two'">我的同城</div>
    </div>

    <div class="content-address" ref="wrapper" >
      <sy-tab-container v-model="isActivity">
        <sy-tab-container-item id="one">
          <div v-show="listsNew.length===0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/untakein.png'" alt="" class="noData">
            <p class="unInfo">暂无最新入驻的志愿组织</p>
          </div>
          <mt-loadmore :top-method="loadTop"
                       @translate-change="translateChange"
                       @top-status-change="handleTopChange"
                       ref="loadmore1"
                       v-show="listsNew.length!==0">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">{{topStatus==='drop'?'释放刷新':'下拉刷新'}}</span>
              <span v-show="topStatus === 'loading'">
                      <img :src="imgList[index]" alt="" ref="new_recruit">
                  </span>
            </div>
            <div class="content-div" ref="div_one">
              <div v-for="item in listsNew" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+item.volunteer_org_id+'&is_share='+share)">
                <img :src="item.avatar" alt="" class="title-wrapper-img">
                <div class="title-wrapper">
                  <div class="title-div">{{item.volunteer_org_name}}</div>
                  <span class="address">{{(item.city+item.area)||"线上"}}</span><span class='time'>{{item.number}}人</span>
                  <div class="descript">{{item.summary}}</div>
                </div>
              </div>
            </div>
          </mt-loadmore>
        </sy-tab-container-item>
        <sy-tab-container-item id="two">
          <!--<div v-show="listsCity.length===0&&!localIsDone" style="position: relative">-->
          <div v-show="listsCity.length===0" style="position: relative">
            <img src="" alt="" ref="loadingP">
            <p style="width: 2rem;text-align: left;left: 50%;margin-left: -1rem;position: relative;color:#ddd">{{loadingData[indexP]}}</p>
          </div>
          <div v-show="listsCity.length===0&&isShow">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/untakein.png'" alt="" class="noData">
            <p class="unInfo">暂无同城的志愿组织</p>
          </div>
          <div v-show="!isShow&&cityLoading">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/untakein.png'" alt="" class="noData">
            <p class="unInfo">数据加载中</p>
          </div>
          <!--<mt-loadmore v-show="listsCity.length!==0&&localIsDone"-->
          <mt-loadmore v-show="listsCity.length!==0"
                       :top-method="loadTop"
                       @translate-change="translateChange"
                       @top-status-change="handleTopChange"
                       ref="loadmore2">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">{{topStatus==='drop'?'释放刷新':'下拉刷新'}}</span>
              <span v-show="topStatus === 'loading'">
                      <img :src="imgList[index]" alt="" ref="new_recruit">
                  </span>
            </div>
            <div class="content-div" ref="div_two">
              <div v-for="item in listsCity" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+item.volunteer_org_id+'&is_share='+share)">
                <img :src="item.avatar" alt="" class="title-wrapper-img">
                <div class="title-wrapper">
                  <div class="title-div">{{item.volunteer_org_name}}</div>
                  <span class="address">{{(item.city+item.area)||"线上"}}</span><span class='time'>{{item.number}}人</span>
                  <div class="descript">{{item.summary}}</div>
                </div>
              </div>
            </div>
          </mt-loadmore>
        </sy-tab-container-item>
        <sy-tab-container-item id="third">
          <div v-show="listsHot.length===0">
            <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/volunteer/untakein.png'" alt="" class="noData">
            <p class="unInfo">暂无热度最高的志愿组织</p>
          </div>
          <mt-loadmore v-show="listsHot.length!==0"
                        :top-method="loadTop"
                       @translate-change="translateChange"
                       @top-status-change="handleTopChange"
                       ref="loadmore3">
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">{{topStatus==='drop'?'释放刷新':'下拉刷新'}}</span>
              <span v-show="topStatus === 'loading'">
                      <img :src="imgList[index]" alt="" ref="new_recruit">
                  </span>
            </div>
            <div class="content-div" ref="div_three">
              <div v-for="item in listsHot" class="list-wrapper" @click="_appjs.syJsbLaunchWebview(siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_detail&volunteer_org_id='+item.volunteer_org_id+'&is_share='+share)">
                <img :src="item.avatar" alt="" class="title-wrapper-img">
                <div class="title-wrapper">
                  <div class="title-div">{{item.volunteer_org_name}}</div>
                  <span class="address">{{(item.city+item.area)||"线上"}}</span><span class='time'>{{item.number}}人</span>
                  <div class="descript">{{item.summary}}</div>
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
        isActivity: 'one',
        getDataDone: false,
        newCurpage: {
          first: 1,
          second: 1,
          third: 1
        },
        wrapperHeight: 0,
        topStatus: '',
        listsNew: [],
        listsCity: [],
        listsHot: [],
        key: '',
        city:'',
        index:0,
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
        timer:'',
        timerP:'',
        indexP:'',
        loadingData:["数据加载中","数据加载中","数据加载中。","数据加载中。","数据加载中。。","数据加载中。。","数据加载中。。。","数据加载中。。。"],
        curpage:'1',
        order:'new',
        localIsDone:false,
        curCity:'',
        isShow:false,
        isNativeLocation:false,
        lng:'',
        lat:'',
        share:''
      }
    },
    created () {
      this.share = this.$route.query.is_share?'yes':''
      this.getUp()
    },
    mounted() {
//        this.city = '广东'
//      setTimeout(()=>{this.seachData('isCity')},2000)
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      window.addEventListener('scroll', this.handleScroll)
      this.getVersion((platform,version)=>{
        this.isNativeLocation =  (platform === 'android' && version > 103) || (platform === 'ios' && version > 88)
      })
      var _this = this;
      var that = this;
      window.setAppLocationInfo = function (data){
//        console.log(2,data)
        if(!data) {
          _this.getQqLocation()
          return
        };
        _this._appjs.syJsbGetAppInfo(function (appInfo){
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
          _this.localIsDone=true
//          _this._appjs.syJsbAlert(JSON.stringify(json_data));
          sessionStorage.volunteer = _this.city = json_data.city;
          sessionStorage.lng = _this.lng = json_data.longitude;
          sessionStorage.lat = _this.lat = json_data.latitude;
          _this.seachData('isCity')
          _this.isShow=false
        });

      }

//      setTimeout(()=>{setAppLocationInfo()},1000)
    },
    computed: {
      toHeight:function () {

      }
    },
    watch: {
      isActivity: function () {
        this.key=''
        this.getDataDone = true
        clearInterval(this.timer)
        switch (this.isActivity) {
          case 'one':
            if(this.listsNew.length===0){
              this.seachData()
            }
            break
          case 'two':
            var that = this
//            that.isShow=true
//            that._appjs.syJsbCheckLocationPermission()
//            if(sessionStorage.volunteer){
            //sessionStorage.lng = _this.lng = json_data.longitude;
            //sessionStorage.lat = _this.lat = json_data.latitude;
            if(sessionStorage.lng){
              that.lng=sessionStorage.lng
              that.lat=sessionStorage.lat
              that.seachData('isCity')
            }else{
              if(!this.city&&!this.localIsDone){
                if(this.isNativeLocation){
                  this._appjs.syJsbLocationInfo('setAppLocationInfo')
                }else{
                  this.getQqLocation()
                }
              }
            }
            break
          case 'third':
            if(this.listsHot.length===0){
              this.seachData()
            }
            break
        }
      }
    },
    methods: {
      getUp(){
        this.$http.get(this.siteInfo.host+'/api/index.php?act=volunteer&op=is_volunteer_updating').then(res=>{
          if(res.data.code == 701){
            window.location.href= this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=is_updating'
          }else{
           this.seachData()
          }
        })
      },
      loadingImg(){
        var that=this;
        that.index=0
        clearInterval(this.timer)
        this.timer=setInterval(function () {
          that.$refs[that.isActivity].src=that.imgList[that.index++]
          if(that.index>7)that.index=0
        },100)
      },
      handleTopChange (status) {
        this.topStatus = status
        if(status=='loading'){
          this.loadingImg()
        }
      },
      translateChange (translate) {
      },
      goSearch(){
        this._appjs.syJsbLaunchWebview(this.siteInfo.host+'/mobile/index.php?act=volunteer_router&op=vol_goods_list&key='+this.key+'&type=index_recent_volunteer_org&is_share='+this.share)
      },
      setState(){
        this.order='new';
        this.curpage=1;
        this.curCity=''
        switch (this.isActivity) {
          case 'one':
            this.order='new';
            this.curCity='';
            this.curpage=this.newCurpage.first
            break
          case 'two':
            this.order='city';
            this.curCity=this.city;
            this.curpage=this.newCurpage.second
            break
          case 'third':
            this.order='hot';
            this.curCity='';
            this.curpage=this.newCurpage.third
            break
        }
      },
      loadTop () {
        this.getDataDone = true
        switch (this.isActivity) {
          case 'one':
            this.newCurpage.first=1
            break
          case 'two':
            this.newCurpage.second=1
            break
          case 'third':
            this.newCurpage.third=1
            break
        }
        this.seachData('search')
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
        if (offsetHeight - clientHeight - scrollTop <= 10 && this.getDataDone) {
          this.getDataDone = false
          switch (this.isActivity) {
            case 'one':this.newCurpage.first++;
            break;
            case 'two':this.newCurpage.second++;
            break;
            case 'third':this.newCurpage.third++;
            break;
          }
          this.seachData()
        }
      },
      seachData(status){
        clearInterval(this.timerP)
        this.setState()
        let url = this.siteInfo.host + '/api/index.php?act=volunteer&op=index_recent_volunteer_org&order='+this.order+'&volunteer_org_name=&curpage='+ this.curpage+'&lng='+this.lng+'&lat='+this.lat +'&city='+this.curCity
        this.$http.get(url).then((res) => {
//          console.log('2res.data',res.data)
          if (res.data.code === 200&&res.data.content.length!==0) {
//            console.log('3status',status)
            if(status==='isCity'){
              this.cityLoading = false
              this.listsCity=res.data.content
              if(this.listsCity.length===0){
                this.isShow=true
              }
              this.$nextTick(function () {
                this.$refs.loadmore2.onTopLoaded()
              })
            }else{
              switch (this.isActivity) {
                case 'one':
                  status==="search"?this.listsNew=res.data.content:this.listsNew=this.listsNew.concat(res.data.content)
                  this.$nextTick(function () {
                    this.$refs.loadmore1.onTopLoaded()
                  })
                  break
                case 'two':
                  status==="search"?this.listsCity=res.data.content:this.listsCity=this.listsCity.concat(res.data.content)
                  if(this.listsCity.length===0){
                    this.isShow=true
                  }
                  this.$nextTick(function () {
                    this.$refs.loadmore2.onTopLoaded()
                  })
                  break
                case 'third':
                  status==="search"?this.listsHot=res.data.content:this.listsHot=this.listsHot.concat(res.data.content)
                  this.$nextTick(function () {
                    this.$refs.loadmore3.onTopLoaded()
                  })
                  break
              }
            }
            clearInterval(this.timer)
            this.getDataDone = true
          } else {
            if(status==='isCity' && res.data.content.length === 0){
              this.isShow=true
            }
          }
        }, (error) => {
          switch (this.isActivity) {
            case 'one':this.$refs.loadmore1.onTopLoaded()
              break
            case 'two':this.$refs.loadmore2.onTopLoaded()
              break
            case 'third':this.$refs.loadmore3.onTopLoaded()
              break
          }
          clearInterval(this.timer)
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
        var that = this
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
//              var geocoder = new qq.maps.Geocoder({
//                complete: function (result) {
//                  that.city = result.detail.addressComponents.city
//                  sessionStorage.volunteer=that.city
//                  that.seachData('isCity')
//                  that.isShow=false
//                }
//              })

              sessionStorage.lng = that.lng = position.coords.longitude
              sessionStorage.lat = that.lat = position.coords.latitude

              that.seachData('isCity')
              that.isShow=false
//              var coord = new qq.maps.LatLng(position.coords.latitude, position.coords.longitude)
//              geocoder.getAddress(coord)
            },function (err) {
              console.log(err)
              if (that.city != '') {
                return
              } else {
                that.listsCity = []
                that.$refs.loadmore3.onTopLoaded()
                that.localIsDone = true

                //                      MessageBox.alert('该服务使用位置功能，请在“设置—公益中国—位置“中开启位置权限。','“公益中国”想要使用位置服务').then(action => {
                //                      });
                that.isShow=true
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
  .top-content {
    min-height: 100%;
  }

  .noData{
    width: 2rem;
    height: 2rem;
    display: inline-block;
    border: 0;
    margin: 2.5rem auto 0.58rem;

  }
  p.unInfo{
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
      font-weight: normal;
      color: #4A90E2;

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
      height: 100%;
      & > div {
        width: 6.9rem;
        padding: 0.23rem 0.2rem 0.3rem 0.2rem;
        box-sizing: border-box;
        font-weight: 300;
        background: #FFFFFF;
        box-shadow: 0 0 .15rem 0 rgba(74, 144, 226, 0.20);
        border-radius: .08rem;
        margin: 0 auto 0.3rem;
        overflow: hidden;
        .list-wrapper {
          overflow: hidden;
        }
        .title-wrapper-img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
          background: #F5F5F5;
          float: left;
          display: inline-block;
          margin-right: 0.2rem;
        }
        .title-wrapper {
          width: 5.1rem;
          float: left;
          overflow: hidden;
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
          width: 0.94rem;
          height: 0.3rem;
          display: inline-block;
          background: url(../../../static/image/volunteer/yellow-bg.png) left center no-repeat;
          background-size: contain;
          font-size: .24rem;
          line-height: 0.3rem;
          color: #4A90E2;
          position: absolute;
          right: 0rem;
          top: 0.05rem;
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
          padding-top:.04rem;
          padding-right: 0.49rem;
          border-right: 1px solid #eee;
          margin-right: 0.49rem;
        }
        .time {
          padding-left: 0.36rem;
          padding-top:.04rem;
          background: url(../../../static/image/volunteer/vol-person.png) left center no-repeat;
          background-size: .22rem auto;
        }
        .descript {
          overflow: hidden;
          clear: both;
          width: 5.1rem;
          font-weight: 300;
          font-size: .26rem;
          color: #666A7F;
          line-height: .40rem;
          text-align: left;
          padding-top: 0.13rem;
          text-overflow: ellipsis;
          white-space: nowrap;

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
