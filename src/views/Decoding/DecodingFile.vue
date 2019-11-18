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
        <div class="el-upload__tip" slot="tip">只能上传txt文本文件</div>
      </el-upload>
    </div>
    <div>
      <el-button type="primary" :disabled="fileList.length ==0" @click="demo">下载</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    demo(res, file, fileList) {
      console.log(file);
      this.fileList = fileList;
    },
    beforeUpload(file) {
      // var fd = new FormData();
      // fd.append("file", file);
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