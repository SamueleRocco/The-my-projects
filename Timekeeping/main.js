gsap.registerPlugin(DrawSVGPlugin);

const ActionButton = Vue.component("ActionButton", {
  template: "#action-button",
  methods: {
    doAction() {
      this.$emit("do-action");
    }
  }
});

new Vue({
  el: "#app",
  data() {
    return {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      interval: null,
      laps: [],
      show: false,
      startPos: 80,
      lapbox: null,
      dur: 0.3,
      currentLap: 1
    };
  },

  computed: {
    formatTimerDisplay() {
      let ms =
        this.milliseconds < 10 ? "0" + this.milliseconds : this.milliseconds;
      let s = this.seconds < 10 ? "0" + this.seconds : this.seconds;
      let m = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      let h = this.hours < 10 ? "0" + this.hours : this.hours;
      let timerStr = `${h}:${m}:${s}:${ms}`;
      return timerStr.substring(3, 11);
    },
    lapsArray() {
      return this.laps.slice().reverse();
    }
  },

  components: {
    ActionButton
  },

  methods: {
    startTimer() {
      this.show = true;
      gsap.to("#timer_visuals", 1, { opacity: 1 });

      let tl = gsap.timeline();
      tl.add(this.mouseDownState("#circ-two-1", ".btn-start"))
        .to(".btn-start", 0.5, {
          x: 0,
          opacity: 0,
          zIndex: 4,
          delay: 0.3
        })
        .to(
          ".btn-stop",
          0.5,
          {
            x: 0,
            opacity: 1,
            zIndex: 5
          },
          "-=0.5"
        )
        .to(
          ".btn-laps",
          0.5,
          {
            x: 0,
            opacity: 1,
            zIndex: 3
          },
          "-=0.5"
        )
        .to(
          ".btn-reset",
          0.5,
          {
            x: 0,
            opacity: 0,
            zIndex: 2
          },
          "-=0.5"
        );

      this.interval = setInterval(this.displayTimer, 1);
    },
    stopTimer() {
      clearInterval(this.interval);

      let tl = gsap.timeline();
      tl.add(this.mouseDownState("#circ-two-2", ".btn-stop"))
        .to(".btn-stop", 0.5, {
          opacity: 0,
          zIndex: 4,
          delay: 0.3
        })
        .to(
          ".btn-start",
          0.5,
          {
            opacity: 1,
            zIndex: 5
          },
          "-=0.5"
        )
        .to(
          ".btn-laps",
          0.5,
          {
            opacity: 0,
            zIndex: 2
          },
          `-=0.5`
        )
        .to(
          ".btn-reset",
          0.5,
          {
            opacity: 1,
            zIndex: 3
          },
          `-=0.5`
        );
    },
    resetTimer() {
      clearInterval(this.interval);
      gsap.to("#timer_visuals", 1, { opacity: 0 });

      this.milliseconds = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.laps = [];

      this.show = false;

      let tl = gsap.timeline();
      tl.add(this.mouseDownState("#circ-two-3", ".btn-laps"))
        .to(".btn-reset", 0.5, {
          x: -this.startPos,
          opacity: 0,
          zIndex: 2,
          delay: 0.4
        })
        .to(
          ".btn-laps",
          0.5,
          {
            x: -this.startPos,
            opacity: 0,
            zIndex: 3
          },
          `-=0.5`
        )
        .to(
          ".btn-stop",
          0.5,
          {
            x: this.startPos,
            opacity: 0,
            zIndex: 4
          },
          `-=0.5`
        )
        .to(
          ".btn-start",
          0.5,
          {
            x: this.startPos,
            opacity: 1,
            zIndex: 5
          },
          `-=0.5`
        );
    },
    addLapTime() {
      let ms =
        this.milliseconds < 10 ? "0" + this.milliseconds : this.milliseconds;
      let s = this.seconds < 10 ? "0" + this.seconds : this.seconds;
      let m = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      let h = this.hours < 10 ? "0" + this.hours : this.hours;
      let timerStr = `${h}:${m}:${s}:${ms}`;
      this.laps.push({
        id: this.laps.length + 1,
        lt: timerStr.substring(3, 11)
      });

      this.currentLap = this.laps.length + 1;

      gsap.from("#lapitem", 0.5, { xPercent: -100 });

      this.mouseDownState("#circ-two-4", ".btn-laps");
    },
    displayTimer() {
      this.milliseconds += 10;
      if (this.milliseconds == 1000) {
        this.milliseconds = 0;
        this.seconds += 1;
        if (this.seconds == 60) {
          this.seconds = 0;
          this.minutes += 1;
          if (this.minutes == 60) {
            this.minutes = 0;
            this.hours += 1;
          }
        }
      }
    },
    mouseDownState(circ, btn) {
      let tl = gsap.timeline({ ease: "sine.in" });
      tl.set(circ, { opacity: 1 })
        .to(circ, this.dur, { drawSVG: "100%" })
        .to(btn, 0.3, { scale: 0.7 }, `-=0.3`)
        .to(circ, this.dur, { drawSVG: "99% 100%" })
        .set(circ, { opacity: 0 })
        .to(btn, 0.3, { scale: 1 }, `-=0.3`)
        .set(circ, { drawSVG: "0% 1%" });
    },
    ringAnimation() {
      let tl = gsap.timeline({ repeat: -1, ease: "sine.out" });

      tl.to("#ring", 1, { drawSVG: "100%", stagger: 0.3 }).to(
        "#ring",
        1,
        { drawSVG: "99% 100%", stagger: 0.3 },
        "+=0.4"
      );
    }
  },

  mounted() {
    gsap.set(["#circ-two-1, #circ-two-2, #circ-two-3, #circ-two-4"], {
      drawSVG: "0% 1%",
      opacity: 0
    });
    gsap.set([".btn-stop, .btn-reset, .btn-laps"], { opacity: 0 });
    gsap.set([".btn-start, .btn-stop"], { x: this.startPos });
    gsap.set([".btn-laps, .btn-reset"], { x: -this.startPos });
    this.ringAnimation();
    gsap.set("#ring", { drawSVG: "0%" });
    gsap.set("#timer_visuals", { opacity: 0 });
  }
});
