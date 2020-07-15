<template>
  <div>
    <nuxt />
    <div class="bottom-navigation bg-white flex fixed bottom-0 h-12 w-full border-t border-gray-300">
      <div class="nav-item w-1/3 flex justify-center">
        <a><img src="/images/home.svg" class="h-6 my-3"></a>
      </div>
      <div class="nav-item w-1/3 flex justify-center">
        <a><img src="/images/follow.svg" class="h-6 my-3"></a>
      </div>
      <div class="nav-item w-1/3 flex justify-center">
        <a><img src="/images/profile.svg" class="h-6 my-3"></a>
      </div>
    </div>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.vertical-middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.modal {
 background:  white;
 width: 100%;
 height: 100%;
 position: fixed;
 top: 0;
}

.uploaded-image {
 max-height: 120px;
}

.post-btn {
 padding: 4px 12px;
 border-radius: 24px;
 background-color: black;
 color: white;
 font-size: 12px;
}

.el-upload {
 width: 100%;
}

.el-button {
 width: 100%;
}
</style>
