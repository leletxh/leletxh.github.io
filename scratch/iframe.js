(function (Scratch) {
    "use strict";
  
    let iframe = null;
    let overlay = null;
  
    const featurePolicy = {
      accelerometer: "'none'",
      "ambient-light-sensor": "'none'",
      battery: "'none'",
      camera: "'none'",
      "display-capture": "'none'",
      "document-domain": "'none'",
      "encrypted-media": "'none'",
      fullscreen: "'none'",
      geolocation: "'none'",
      gyroscope: "'none'",
      magnetometer: "'none'",
      microphone: "'none'",
      midi: "'none'",
      payment: "'none'",
      "picture-in-picture": "'none'",
      "publickey-credentials-get": "'none'",
      "speaker-selection": "'none'",
      usb: "'none'",
      vibrate: "'none'",
      vr: "'none'",
      "screen-wake-lock": "'none'",
      "web-share": "'none'",
      "interest-cohort": "'none'",
    };
  
    const SANDBOX = [
      "allow-same-origin",
      "allow-scripts",
      "allow-forms",
      "allow-modals",
      "allow-popups",
    ];
  
    let x = 0;
    let y = 0;
    let width = -1;
    let height = -1;
    let interactive = true;
    let resizeBehavior = "scale";
  
    const updateFrameAttributes = () => {
      if (!iframe) return;
  
      iframe.style.pointerEvents = interactive ? "auto" : "none";
      const { stageWidth, stageHeight } = Scratch.vm.runtime;
      const effectiveWidth = width >= 0 ? width : stageWidth;
      const effectiveHeight = height >= 0 ? height : stageHeight;
  
      if (resizeBehavior === "scale") {
        iframe.style.width = `${effectiveWidth}px`;
        iframe.style.height = `${effectiveHeight}px`;
        iframe.style.transform = `translate(${-effectiveWidth / 2 + x}px, ${-effectiveHeight / 2 - y}px)`;
        iframe.style.top = "0";
        iframe.style.left = "0";
      } else {
        iframe.style.width = `${(effectiveWidth / stageWidth) * 100}%`;
        iframe.style.height = `${(effectiveHeight / stageHeight) * 100}%`;
        iframe.style.transform = "";
        iframe.style.top = `${(0.5 - effectiveHeight / 2 / stageHeight - y / stageHeight) * 100}%`;
        iframe.style.left = `${(0.5 - effectiveWidth / 2 / stageWidth + x / stageWidth) * 100}%`;
      }
    };
  
    const getOverlayMode = () => (resizeBehavior === "scale" ? "scale-centered" : "manual");
  
    const createFrame = (src) => {
      iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.style.position = "absolute";
      iframe.setAttribute("sandbox", SANDBOX.join(" "));
      iframe.setAttribute(
        "allow",
        Object.entries(featurePolicy).map(([name, permission]) => `${name} ${permission}`).join("; ")
      );
      iframe.setAttribute("src", src);
  
      overlay = Scratch.renderer.addOverlay(iframe, getOverlayMode());
      updateFrameAttributes();
    };
  
    const closeFrame = () => {
      if (iframe) {
        Scratch.renderer.removeOverlay(iframe);
        iframe = null;
        overlay = null;
      }
    };
  
    Scratch.vm.on("STAGE_SIZE_CHANGED", updateFrameAttributes);
    Scratch.vm.runtime.on("RUNTIME_DISPOSED", closeFrame);
  
    class IframeExtension {
      getInfo() {
        return {
          name: "内联框架",
          id: "iframe",
          blocks: [
            {
              opcode: "display",
              blockType: Scratch.BlockType.COMMAND,
              text: "显示网站 [URL]",
              arguments: {
                URL: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "https://extensions.turbowarp.org/hello.html",
                },
              },
            },
            {
              opcode: "displayHTML",
              blockType: Scratch.BlockType.COMMAND,
              text: "显示HTML [HTML]",
              arguments: {
                HTML: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "<h1>成功加载！</h1>",
                },
              },
            },
            "---",
            { opcode: "show", blockType: Scratch.BlockType.COMMAND, text: "显示框架" },
            { opcode: "hide", blockType: Scratch.BlockType.COMMAND, text: "隐藏框架" },
            { opcode: "close", blockType: Scratch.BlockType.COMMAND, text: "关闭框架" },
            "---",
            {
              opcode: "get",
              blockType: Scratch.BlockType.REPORTER,
              text: "框架属性 [MENU]",
              arguments: {
                MENU: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "getMenu",
                },
              },
            },
            {
              opcode: "setX",
              blockType: Scratch.BlockType.COMMAND,
              text: "设置框架x坐标为 [X]",
              arguments: { X: { type: Scratch.ArgumentType.NUMBER, defaultValue: "0" } },
            },
            {
              opcode: "setY",
              blockType: Scratch.BlockType.COMMAND,
              text: "设置框架y坐标为 [Y]",
              arguments: { Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: "0" } },
            },
            {
              opcode: "setWidth",
              blockType: Scratch.BlockType.COMMAND,
              text: "设置框架宽度为 [WIDTH]",
              arguments: { WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: "480" } },
            },
            {
              opcode: "setHeight",
              blockType: Scratch.BlockType.COMMAND,
              text: "设置框架高度为 [HEIGHT]",
              arguments: { HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: "360" } },
            },
            {
              opcode: "setInteractive",
              blockType: Scratch.BlockType.COMMAND,
              text: "设置框架可交互性为 [INTERACTIVE]",
              arguments: { INTERACTIVE: { type: Scratch.ArgumentType.STRING, menu: "interactiveMenu" } },
            },
            {
              opcode: "setResize",
              blockType: Scratch.BlockType.COMMAND,
              text: "设置框架调整行为为 [RESIZE]",
              arguments: { RESIZE: { type: Scratch.ArgumentType.STRING, menu: "resizeMenu" } },
            },
          ],
          menus: {
            getMenu: {
              acceptReporters: true,
              items: [
                { text: "网址", value: "url" },
                { text: "可见性", value: "visible" },
                { text: "x坐标", value: "x" },
                { text: "y坐标", value: "y" },
                { text: "宽度", value: "width" },
                { text: "高度", value: "height" },
                { text: "可交互性", value: "interactive" },
                { text: "调整尺寸行为", value: "resize behavior" },
              ],
            },
            interactiveMenu: {
              acceptReporters: true,
              items: [
                { text: "启用", value: "true" },
                { text: "禁用", value: "false" },
              ],
            },
            resizeMenu: {
              acceptReporters: true,
              items: [
                { text: "缩放", value: "scale" },
                { text: "视口", value: "viewport" },
              ],
            },
          },
        };
      }
  
      display({ URL }) {
        closeFrame();
        createFrame(Scratch.Cast.toString(URL));
      }
  
      displayHTML({ HTML }) {
        closeFrame();
        const url = `data:text/html;,${encodeURIComponent(Scratch.Cast.toString(HTML))}`;
        createFrame(url);
      }
  
      show() { if (iframe) iframe.style.display = ""; }
      hide() { if (iframe) iframe.style.display = "none"; }
      close() { closeFrame(); }
  
      get({ MENU }) {
        MENU = Scratch.Cast.toString(MENU);
        if (!iframe) return "";
        switch(MENU) {
          case "url": return iframe.src;
          case "visible": return iframe.style.display !== "none";
          case "x": return x;
          case "y": return y;
          case "width": return width >= 0 ? width : Scratch.vm.runtime.stageWidth;
          case "height": return height >= 0 ? height : Scratch.vm.runtime.stageHeight;
          case "interactive": return interactive;
          case "resize behavior": return resizeBehavior;
          default: return "";
        }
      }
  
      setX({ X }) { x = Scratch.Cast.toNumber(X); updateFrameAttributes(); }
      setY({ Y }) { y = Scratch.Cast.toNumber(Y); updateFrameAttributes(); }
      setWidth({ WIDTH }) { width = Scratch.Cast.toNumber(WIDTH); updateFrameAttributes(); }
      setHeight({ HEIGHT }) { height = Scratch.Cast.toNumber(HEIGHT); updateFrameAttributes(); }
      setInteractive({ INTERACTIVE }) { interactive = Scratch.Cast.toBoolean(INTERACTIVE); updateFrameAttributes(); }
  
      setResize({ RESIZE }) {
        if (["scale", "viewport"].includes(RESIZE)) {
          resizeBehavior = RESIZE;
          if (overlay) {
            overlay.mode = getOverlayMode();
            Scratch.renderer._updateOverlays();
            updateFrameAttributes();
          }
        }
      }
    }
  
    Scratch.extensions.register(new IframeExtension());
  })(Scratch);
  
