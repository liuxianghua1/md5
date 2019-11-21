<template>
  <div>
    <div>
      <el-upload
        class="upload-demo"
        action="http://192.168.0.77:8080/xsl-decode/decodeRecode/decode.zul"
        :headers="headers"
        :before-upload="beforeUpload"
        drag
        :on-success="demo"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传txt文本文件,内容按行输入IMEL!</div>
      </el-upload>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      res: ""
    };
  },
  methods: {
    async demo(res, file, fileList) {
      if (res[0].code == 1) {
        this.$message({
          message: "内容有误,请换个文件!",
          type: "error"
        });
        this.fileList = [];
      } else if (res[0].code == 13) {
        this.$message({
          message: "余额不足请充值!",
          type: "error"
        });
      } else if (res[0].code == 14) {
        this.$message({
          message: "账户不存在该用户!",
          type: "error"
        });
      } else if (res[0].code == 0) {
        this.fileList = fileList;
        this.res = res[0].path;
        this.$message({
          message: "上传成功,可以进行下载!",
          type: "success"
        });
        let demo = encodeURIComponent(this.res);
        window.open(
          `http://192.168.0.77:8080/xsl-decode/decodeRecode/downMd5.zul?path=${demo}`
        );
      }
    },
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "txt";
      if (!extension) {
        this.$message({
          message: "上传文件只能是txt文本格式!",
          type: "error"
        });
      }
      // const res = await this.$http.post("decodeRecode/decode.zul", fd);
      // console.log(res);
      return extension;
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