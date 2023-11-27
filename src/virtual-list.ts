import { define, html, style } from "hybrids";
import styles from "./virtual-list.scss?inline";

define({
  tag: "virtual-list",
  startIndex: 0,
  endIndex: 0,
  minChannelHeight: 30,
  top: 0,
  topStackChannels: {
    get: (host, value) => value || [],
    set: (host, value) => value,
  },
  mainStackChannels: {
    get: (host, value) => value || [],
    set: (host, value) => value,
  },
  channels: {
    get: (host, value) => value || [],
    set: (host, value) => value,
    connect: (host, value) => {
      const update = (event = { deltaY: 0 }) => throttleWheelEvent(host, event);
      setTimeout(update);
      host.parentElement.addEventListener("wheel", update, { passive: false });
      return () => {
        host.parentElement.removeEventListener("wheel", update);
      };
    },
    observe: (host, value) => {
      throttleWheelEvent(host, { deltaY: 0 });
    },
  },
  render: ({ name, channels, top, mainStackChannels, topStackChannels }) =>
    html`<p>Virtual List</p>
      <div class="channels">
        <div class="virtualizer">
          <div class="top-stack" style="top: ${top}px">
            ${topStackChannels.map(renderChannel)}
          </div>
          <div class="main-stack" style="top: ${top}px">
            ${mainStackChannels.map(renderChannel)}
          </div>
        </div>
      </div>`.style(styles),
});

function renderChannel({ height, color, name }) {
  return html`<div
    class="channel"
    style="
      background-color: ${color};
      min-height: ${height}px;
      "
  >
    <b> # ${name} </b>
    <slot />
  </div>`;
}

function updateWheelDelta(host, delta) {
  const { height: viewportHeight } = host.getBoundingClientRect();

  delta *= 0.2;

  host.top -= delta;

  const channelElements = [
    ...(host.shadowRoot?.querySelector(".virtualizer .main-stack").children ||
      []),
  ];

  const virtualizer = host.shadowRoot?.querySelector(".virtualizer");

  if (virtualizer) {
    const topStack = virtualizer.querySelector(".top-stack");
    const mainStack = virtualizer.querySelector(".main-stack");

    const { height: virtualizerHeight, top: virtualizerY } =
      virtualizer.getBoundingClientRect();
    const { top: mainStackY } = mainStack.getBoundingClientRect();
    const top = mainStackY - virtualizerY;

    if (delta >= 0) {
      /*
       * MOVING UP
       */

      // count how many to remove
      let scannedDistanceUp = 0;
      let index, channelElement;
      let count = 0;
      for ([index, channelElement] of channelElements.entries()) {
        count += 1;
        const { height } = channelElement.getBoundingClientRect();
        scannedDistanceUp -= height;
        if (scannedDistanceUp > top) {
          host.top -= scannedDistanceUp;
          host.startIndex += count;
          break;
        }
      }

      // estimate how many should be visible based on min height,
      //  we use a min height so we often get a few extras
      const numToAdd = Math.ceil(virtualizerHeight / host.minChannelHeight);

      host.endIndex = host.startIndex + numToAdd;

      // check for bottom lock
      if (channelElements.length) {
        const { height: lastOneHeight, top: lastOneY } =
          channelElements[channelElements.length - 1].getBoundingClientRect();
        if (lastOneY - lastOneHeight < virtualizerHeight - virtualizerY) {
          // cheap but inaccurate approach
          host.top += delta;
          // TODO: more accurate but expensive:
          // find the new top position by checking heights from bottom
        }
      }
    } else {
      /*
       * MOVING DOWN
       */

      // move the top stack items to the main stack
      const children = [...(topStack?.children || [])];
      const offset = children
        .map((element) => element.getBoundingClientRect())
        .reduce((total, { height }) => total + height, 0);

      host.top -= offset;
      host.startIndex -= children.length;
      host.topStackChannels.length = 0;

      // when moving down,
      // we count the gap between top main stack element and top of virtualizer
      // we use a min height of 30 to estimate the amount of channels to add
      const gap = mainStackY - virtualizerY;
      if (gap > 0) {
        const numToAdd = Math.ceil(gap / host.minChannelHeight);
        host.topStackChannels = host.channels.slice(
          host.startIndex - numToAdd,
          host.startIndex
        );
      }

      for (let i = channelElements.length - 1; i >= 0; i -= 1) {
        const element = channelElements[i];
        const { top } = element.getBoundingClientRect();
        if (top > virtualizerHeight + virtualizerY) {
          host.endIndex -= 1;
        } else {
          break;
        }
      }

      // check for top lock
      if (host.startIndex === 0 && host.top > 0) {
        host.top = 0;
      }
    }

    // slice visible channels from new indexes
    host.endIndex = Math.max(host.startIndex + 1, host.endIndex);
    host.mainStackChannels = host.channels.slice(
      host.startIndex,
      host.endIndex
    );
  }
}

function throttleWheelEvent(host, event) {
  event.preventDefault && event.preventDefault();
  event.stopPropagation && event.stopPropagation();
  // TODO: Implement throttle for better perf
  updateWheelDelta(host, event?.deltaY || 0);
}

function throttle(callback: Function, limit: number = 100): Function {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}
