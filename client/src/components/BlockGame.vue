<template>
  <div>
    <div>
      <canvas 
        ref="game" 
        width="800"
        height="600"
        style="border: 1px solid #333"
      ></canvas>
    </div>
    <button>Clear</button>
  </div>
</template>

<script>
import {io} from "socket.io-client";
export default {
  name: 'BlockGame',
  data () {
    return {
      socket: {},
      context: {},
      position: { x: 0, y: 0 }
    }
  },
  methods: {
    reposition(x, y) {
      this.position.x = x - this.$refs.game.offsetLeft;
      this.position.y = y - this.$refs.game.offsetTop;
    },
    start(event) {
      document.addEventListener("mousemove", this.draw);
      this.reposition(event.clientX, event.clientY);
    },
    stop() {
      document.removeEventListener("mousemove", this.draw);
    },
    draw(event) {
      

      
      this.socket.emit("draw", { x: event.clientX, y: event.clientY });
    },
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("position", data => {
      this.context.beginPath();
      this.context.lineWidth = 5;
      this.context.lineCap = "round";
      this.context.strokeStyle = "#ACD3ED";
      this.context.moveTo(this.position.x, this.position.y);
      this.reposition(data.x, data.y);
      this.context.lineTo(this.position.x, this.position.y);
      this.context.stroke();
    });


    


    document.addEventListener('mousedown', this.start);
    document.addEventListener('mouseup', this.stop);
  }
}
</script>

<style lang="css">
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
