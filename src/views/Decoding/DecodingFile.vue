<template>
  <div>
    <!-- <div>
      <el-upload
        class="upload-demo"
        action
        :before-upload="beforeUpload"
        :on-change="change"
        :limit="5"
        multiple
        :on-exceed="handleExceed"
        :file-list="fileList"
        drag
        :on-success="demo"
        :http-request="uploadFile"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传txt文本文件,内容按行输入IMEL!</div>
      </el-upload>
    </div>-->
    <div>
      <el-upload
        action
        drag
        class="upload-demo"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :limit="5"
        :file-list="fileList"
        :on-change="change"
        multiple
        :http-request="uploadFile"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传txt文本文件,内容按行输入IMEL!</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      res: "",
      result: ""
    };
  },
  methods: {
    uploadFile() {
      let formData = new FormData();
      if (this.fileList.length > 0) {
        this.fileList.forEach(file => {
          formData.append("file", file);
        });
        if (formData.getAll("file").length == this.length && this.length > 0) {
          this.$http.post("decodeRecode/decodeMore.zul", formData).then(res => {
            this.fileList = [];
            //此处重置文件中间存储变量是为了相同文件能够重复传递
            switch (res.data[0].code) {
              case 0:
                this.res = res.data[0].path;
                this.$message({
                  message: "上传成功,可以进行下载!",
                  type: "success"
                });
                this.result = encodeURIComponent(this.res);
                window.open(
                  `http://192.168.99.91:8080/xsl-decode/decodeRecode/downMd5.zul?path=${this.result}&id=${localStorage.id}`
                );
                this.fileList = [];
                break;
              case 16:
                this.fileList = [];
                this.$message({
                  message: "未查到该解码数据!",
                  type: "error"
                });
                break;
              case 15:
                this.fileList = [];
                this.$message({
                  message: "文件异常!",
                  type: "error"
                });
                break;
              case 14:
                this.$message({
                  message: "账户不存在该用户!",
                  type: "error"
                });
                this.fileList = [];
                break;
              case 13:
                this.$message({
                  message: "余额不足请充值!",
                  type: "error"
                });
                this.fileList = [];
                break;
              case 1:
                this.$message({
                  message: "内容有误,请换个文件!",
                  type: "error"
                });
                this.fileList = [];
                break;
              default:
                this.$message({
                  message: "服务器偷懒了,请稍后再试!",
                  type: "error"
                });
                this.fileList = [];
            }
          });
        }
      }
    },
    change() {
      //判断上传文件数量
      this.length = document.querySelector("input[type=file]").files.length;
      if (this.length > 0) {
        Array.from(document.querySelector("input[type=file]").files).forEach(
          file => {
            if (this.fileList.indexOf(file) == -1) {
              this.fileList.push(file);
            }
          }
        );
      }
      return false;
    },
    // async demo(res, file, fileList) {
    //   if (res[0].code == 1) {
    //     this.$message({
    //       message: "内容有误,请换个文件!",
    //       type: "error"
    //     });
    //     this.fileList = [];
    //   } else if (res[0].code == 13) {
    //     this.$message({
    //       message: "余额不足请充值!",
    //       type: "error"
    //     });
    //   } else if (res[0].code == 14) {
    //     this.$message({
    //       message: "账户不存在该用户!",
    //       type: "error"
    //     });
    //   } else if (res[0].code == 15) {
    //     this.$message({
    //       message: "文件异常!",
    //       type: "error"
    //     });
    //   } else if (res[0].code == 16) {
    //     this.$message({
    //       message: "未查到该解码数据!",
    //       type: "error"
    //     });
    //   } else if (res[0].code == 0) {
    //     this.fileList = fileList;
    //     this.res = res[0].path;
    //     this.$message({
    //       message: "上传成功,可以进行下载!",
    //       type: "success"
    //     });
    //     let demo = encodeURIComponent(this.res);
    //     window.open(
    //       `http://192.168.99.91:8080/xsl-decode/decodeRecode/downMd5.zul?path=${demo}&id=${localStorage.id}`
    //     );
    //     // window.open(
    //     //   `http://192.168.0.100:8081/xsl-decode/decodeRecode/downMd5.zul?path=${demo}`
    //     // );
    //   }
    // },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "txt";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!extension) {
        this.$message({
          message: "上传文件只能是txt文本格式!",
          type: "warning"
        });
        this.fileList = [];
      } else {
        if (!isLt2M) {
          this.$message({
            message: "上传文件大小不能超过 5MB!",
            type: "warning"
          });
          this.fileList = [];
        }
      }
      return extension && isLt2M;
    }
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + localStorage.token
      };
    }
  }
};
</script>