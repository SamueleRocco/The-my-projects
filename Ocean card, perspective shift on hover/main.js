$("#card-bg").on("canplay", () => {
    $("#card-bg").fadeIn();
  });
  
  $(document).ready(() => {
    let card = $(".card");
    let container = $(".container");
    let r = card[0].getBoundingClientRect();
    let strength = 5;
    let center = {
      x: r.left + r.width / 2,
      y: r.top + r.height / 2
    };
    var dif = {
      x: 0,
      y: 0
    };
    var transform = {
      x: 0,
      y: 0
    };
  
    $(document).mousemove((event) => {
      dif = {
        x: ((event.clientX - center.x) / r.width) * 2,
        y: ((event.clientY - center.y) / r.height) * 2
      };
      transform = {
        x: dif.y * strength * -1,
        y: dif.x * strength
      };
    });
  
    container.mousemove((event) => {
      gsap.to(card, {
        rotateX: `${transform.x}deg`,
        rotateY: `${transform.y}deg`,
        overwrite: true,
        duration: 0.2
      });
    });
  
    container.mouseleave((event) => {
      gsap.to(card, {
        rotateX: "0deg",
        rotateY: "0deg",
        overwrite: true
      });
    });
  });
  