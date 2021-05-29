import React, { useState } from "react"
import ReactDOM from "react-dom"
import { Frame, useCycle } from "framer"
import { motion, useMotionValue } from "framer-motion"
import { useCycle as useCycleFramerMotion } from "framer-motion"

import "./styles.css"

function App() {
  const DEFAULT_TOGGLE_WIDTH = 80

  // Various React Hooks for constants to allow fullscreen mode for presentation
  const [TOGGLE_WIDTH, setTOGGLE_WIDTH] = useState(DEFAULT_TOGGLE_WIDTH)
  const [TOGGLE_HEIGHT, setTOGGLE_HEIGHT] = useState(TOGGLE_WIDTH / 2)
  const [TOGGLE_RADIUS, setTOGGLE_RADIUS] = useState(TOGGLE_WIDTH / 4)
  const [BETWEEN_TOGGLES, setBETWEEN_TOGGLES] = useState(TOGGLE_WIDTH / 10)
  const [KNOB_START, setKNOB_START] = useState(0)
  const [KNOB_END, setKNOB_END] = useState(TOGGLE_WIDTH / 2)

  const [FULLSCREEN, setFULLSCREEN] = useState(false)

  const toggleFULLSCREEN = () => {
    let toggle_width = !FULLSCREEN
      ? DEFAULT_TOGGLE_WIDTH * 2
      : DEFAULT_TOGGLE_WIDTH
    setFULLSCREEN(!FULLSCREEN)
    setTOGGLE_WIDTH(toggle_width)
    setTOGGLE_HEIGHT(toggle_width / 2)
    setTOGGLE_RADIUS(toggle_width / 4)
    setBETWEEN_TOGGLES(toggle_width / 10)
    setKNOB_START(0)
    setKNOB_END(toggle_width / 2)
  }

  // Framer hooks: useCycle calls
  const [knobX, cycleKnobX] = useCycle(KNOB_START, KNOB_END)
  const [trackBackground, cycleTrackBackground] = useCycle(
    "lightslategray",
    "orange"
  )
  const [toggleMode, cycleToggleMode] = useCycle("off", "on")
  const [toggleModeThreeWay, cycleToggleModeThreeWay] = useCycle(
    "off",
    "middle",
    "on",
    "middle"
  )

  // Framer motion hooks: useCycle calls
  const [knobXFramerMotion, cycleKnobXFramerMotion] = useCycleFramerMotion(
    KNOB_START,
    KNOB_END
  )
  // Have to use rgb or hex codes for Framer Motion animations:
  const [
    trackBackgroundFramerMotion,
    cycleTrackBackgroundFramerMotion
  ] = useCycleFramerMotion("rgb(119, 136, 153)", "#FFA500") // lightslategray, orange
  const [
    toggleModeFramerMotion,
    cycleToggleModeFramerMotion
  ] = useCycleFramerMotion("off", "on")
  const [
    toggleModeThreeWayFramerMotion,
    cycleToggleModeThreeWayFramerMotion
  ] = useCycleFramerMotion("off", "middle", "on", "middle")

  // List item for web examples to reduce code duplication
  const ListItem = ({ text, link }) => {
    return (
      <div
        style={{
          background: "lightslategray",
          width: TOGGLE_WIDTH * 0.75,
          height: TOGGLE_HEIGHT * 0.75,
          borderRadius: TOGGLE_RADIUS,
          marginLeft: "1px",
          display: "inline-flex",
          userSelect: "none",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          fontSize: TOGGLE_RADIUS / 2,
          fontWeight: "bold"
        }}
      >
        <a href={link}>{text}</a>
      </div>
    )
  }

  const webExamples = [
    {
      text: "Motion Variants",
      link: "https://codesandbox.io/s/variants-uotor?from-embed"
    },
    {
      text: "Drag to Reorder",
      link:
        "https://codesandbox.io/s/framer-motion-drag-to-reorder-pkm1k?from-embed"
    },
    {
      text: "Mouse Parallax",
      link: "https://codesandbox.io/s/week2-parallax-l87to"
    },
    {
      text: "Tinder Swipe",
      link: "https://codesandbox.io/s/mouse-parallax-tinder-swipe-etrxr"
    },
    {
      text: "Animated Penguin",
      link:
        "https://codesandbox.io/s/animated-emoji-penguin-github-master-q56zz"
    },
    {
      text: "Animated Laugh",
      link: "https://codesandbox.io/s/animated-emoji-laugh-github-master-8h6gm"
    },
    {
      text: "3-Way Toggle",
      link:
        "https://codesandbox.io/s/framer-motion-3-way-toggle-drag-drop-list-ludzw"
    },
    {
      text: "Framer Motion API",
      link: "https://www.framer.com/api/motion/#quick-start"
    },
    {
      text: "Frame → motion.div",
      link: "https://www.framer.com/api/motion/handoff/"
    }
  ]

  return (
    <div className="App">
      <h2 // Trigger fullscreen mode (double size) with click on H2
        style={{
          fontSize: TOGGLE_RADIUS * 0.8
        }}
        onClick={() => toggleFULLSCREEN()}
      >
        <br />
        Animating React using
        <br />
        Framer & Framer Motion
        <br />
        <br />
        by Dr. Derek Austin 🥳
        <br />
        <a href="http://medium.com/@derek_develops" style={{ color: "blue" }}>
          @derek_develops
        </a>
        <br />
        <br />
      </h2>
      <div
        className="framerExamples" // Framer Examples
        style={{
          minHeight: TOGGLE_HEIGHT * 2,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1
          style={{
            backgroundColor: "lightcoral",
            fontSize: TOGGLE_RADIUS * 1.2
          }}
        >
          Framer toggles
        </h1>
        <Frame // Example 1: Basic animated toggle switch using spring
          // Frame is basically equivalent to motion.div in Framer Motion
          className="toggle"
          background="lightslategray"
          width={TOGGLE_WIDTH}
          height={TOGGLE_HEIGHT}
          borderRadius={TOGGLE_RADIUS}
          x={-2 * BETWEEN_TOGGLES}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleKnobX()
            // Keep the koala happy: (Example 3)
            cycleTrackBackground()
          }}
          style={{
            // Frames are absolute positioned by default
            position: "relative",
            display: "inline-flex"
          }}
        >
          <Frame
            className="handle"
            size={TOGGLE_HEIGHT}
            borderRadius={TOGGLE_RADIUS}
            animate={{ x: knobX }}
            // transition={{ duration: 0.2 }} // transition changes from spring to ease
            background="white"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS
            }}
          >
            <span role="img" aria-label="Toggle handle">
              ♨️
            </span>
          </Frame>
        </Frame>

        <Frame // Example 2: Basic animated toggle switch using ease
          // Frame is basically equivalent to motion.div in Framer Motion
          className="toggle"
          background="lightslategray"
          width={TOGGLE_WIDTH}
          height={TOGGLE_HEIGHT}
          borderRadius={TOGGLE_RADIUS}
          x={BETWEEN_TOGGLES - 2 * BETWEEN_TOGGLES}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleKnobX()
            // Keep the koala happy: (Example 3)
            cycleTrackBackground()
          }}
          style={{
            // Frames are absolute positioned by default
            position: "relative",
            display: "inline-flex"
          }}
        >
          <Frame
            className="handle"
            size={TOGGLE_HEIGHT}
            borderRadius={TOGGLE_RADIUS}
            animate={{ x: knobX }}
            transition={{ duration: 0.2 }} // transition changes from spring to ease
            background="white"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS
            }}
          >
            <span role="img" aria-label="Toggle handle">
              🐧
            </span>
          </Frame>
        </Frame>

        <Frame // Example 3: Alternate background on toggle
          // Frame is basically equivalent to motion.div in Framer Motion
          className="toggle"
          background="lightslategray"
          width={TOGGLE_WIDTH}
          height={TOGGLE_HEIGHT}
          borderRadius={TOGGLE_RADIUS}
          x={2 * BETWEEN_TOGGLES - 2 * BETWEEN_TOGGLES}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleKnobX()
            cycleTrackBackground()
          }}
          animate={{ backgroundColor: trackBackground }}
          style={{
            // Frames are absolute positioned by default
            position: "relative",
            display: "inline-flex"
          }}
        >
          <Frame
            className="handle"
            size={TOGGLE_HEIGHT}
            borderRadius={TOGGLE_RADIUS}
            animate={{ x: knobX }}
            transition={{ duration: 0.2 }} // transition changes from spring to ease
            background="white"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS
            }}
          >
            <span role="img" aria-label="Toggle handle">
              🐨
            </span>
          </Frame>
        </Frame>

        <Frame // Example 4: Refactor to variants
          // Frame is basically equivalent to motion.div in Framer Motion
          className="toggle"
          background="lightslategray"
          width={TOGGLE_WIDTH}
          height={TOGGLE_HEIGHT}
          borderRadius={TOGGLE_RADIUS}
          x={3 * BETWEEN_TOGGLES - 2 * BETWEEN_TOGGLES}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleToggleMode()
          }}
          animate={toggleMode}
          variants={{
            off: { backgroundColor: "lightslategray" },
            on: { backgroundColor: "orange" }
          }}
          style={{
            // Frames are absolute positioned by default
            position: "relative",
            display: "inline-flex"
          }}
        >
          <Frame
            className="handle"
            size={TOGGLE_HEIGHT}
            borderRadius={TOGGLE_RADIUS}
            // Specifying animate is optional because it is inherited
            // animate={toggleMode}
            variants={{
              off: { x: KNOB_START },
              on: { x: KNOB_END }
            }}
            transition={{ duration: 0.2 }} // transition changes from spring to ease
            background="white"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS
            }}
          >
            <span role="img" aria-label="Toggle handle">
              🐅
            </span>
          </Frame>
        </Frame>

        <Frame // Example 5: Three-way toggle with variants
          // Frame is basically equivalent to motion.div in Framer Motion
          className="toggle"
          background="lightslategray"
          // Note here that since the background color is different from
          // the first variant, Framer will animate the color change
          // from the background color to the first variant upon loading
          width={TOGGLE_WIDTH * 1.5}
          height={TOGGLE_HEIGHT}
          borderRadius={TOGGLE_RADIUS}
          x={4 * BETWEEN_TOGGLES - 2 * BETWEEN_TOGGLES}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleToggleModeThreeWay()
          }}
          animate={toggleModeThreeWay}
          variants={{
            off: { backgroundColor: "red" },
            middle: { backgroundColor: "yellow" },
            on: { backgroundColor: "green" }
          }}
          style={{
            // Frames are absolute positioned by default
            position: "relative",
            display: "inline-flex"
          }}
        >
          <Frame
            className="handle"
            size={TOGGLE_HEIGHT}
            borderRadius={TOGGLE_RADIUS}
            // Specifying animate is optional because it is inherited
            // animate={toggleModeThreeWay}
            variants={{
              off: { x: KNOB_START, backgroundColor: "rgb(255,255,255)" }, // white
              middle: { x: KNOB_END, backgroundColor: "rgb(211,211,211)" }, // lightgray
              on: { x: KNOB_END * 2, backgroundColor: "rgb(255,255,255)" } // white
            }}
            transition={{ duration: 0.2 }} // transition changes from spring to ease
            background="white"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS
            }}
            initial={false} // Stop from flashing
            // Server-side rendering: The animated state of a component will be rendered server-side to prevent flashes of re-styled content after your JavaScript loads.
          >
            <span role="img" aria-label="Toggle handle">
              🚦
            </span>
          </Frame>
        </Frame>
      </div>

      <div
        className="framerMotionExamples" // Framer Motion Examples
        style={{
          minHeight: TOGGLE_HEIGHT * 2,
          display: "flex-shrink"
        }}
      >
        <h1
          style={{
            backgroundColor: "lightyellow",
            fontSize: TOGGLE_RADIUS * 1.2
          }}
        >
          Framer Motion toggles
        </h1>
        <div
          class="break" // Flexbox line break
          /* Inserting this collapsed row between two flex items will make
           * the flex item that comes after it break to a new row */
          style={{
            flexBasis: "100%",
            height: 0
          }}
        />
        <motion.div // Example 1: Basic animated toggle switch using spring
          // motion.div is basically equivalent to Frame in Framer,
          // except most style elements need to be moved into the style tag
          className="toggle"
          style={{
            background: "lightslategray",
            width: TOGGLE_WIDTH,
            height: TOGGLE_HEIGHT,
            borderRadius: TOGGLE_RADIUS,
            display: "inline-flex",
            userSelect: "none",
            position: "relative",
            left: -BETWEEN_TOGGLES * 2
          }}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleKnobXFramerMotion()
            // Keep the koala happy: (Example 3)
            cycleTrackBackgroundFramerMotion()
          }}
        >
          <motion.div
            className="handle"
            animate={{ x: knobXFramerMotion }}
            // transition={{ duration: 0.2 }} // transition changes from spring to ease
            style={{
              width: TOGGLE_HEIGHT, // Can't use "size" attribute
              height: TOGGLE_HEIGHT, // So need to set width and height
              borderRadius: TOGGLE_RADIUS,
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS
            }}
          >
            <span role="img" aria-label="Toggle handle">
              ♨️
            </span>
          </motion.div>
        </motion.div>

        <motion.div // Example 2: Basic animated toggle switch using ease
          // motion.div is basically equivalent to Frame in Framer,
          // except most style elements need to be moved into the style tag
          className="toggle"
          style={{
            background: "lightslategray",
            width: TOGGLE_WIDTH,
            height: TOGGLE_HEIGHT,
            borderRadius: TOGGLE_RADIUS,
            left: BETWEEN_TOGGLES - BETWEEN_TOGGLES * 2,
            display: "inline-flex",
            userSelect: "none",
            position: "relative"
          }}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleKnobXFramerMotion()
            // Keep the koala happy: (Example 3)
            cycleTrackBackgroundFramerMotion()
          }}
        >
          <motion.div
            className="handle"
            animate={{ x: knobXFramerMotion }}
            transition={{ duration: 0.2 }} // transition changes from spring to ease
            style={{
              width: TOGGLE_HEIGHT, // Can't use "size" attribute
              height: TOGGLE_HEIGHT, // So need to set width and height
              borderRadius: TOGGLE_RADIUS,
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS
            }}
          >
            <span role="img" aria-label="Toggle handle">
              🐧
            </span>
          </motion.div>
        </motion.div>

        <motion.div // Example 3: Alternate background on toggle
          // motion.div is basically equivalent to Frame in Framer,
          // except most style elements need to be moved into the style tag
          className="toggle"
          style={{
            background: "lightslategray",
            width: TOGGLE_WIDTH,
            height: TOGGLE_HEIGHT,
            borderRadius: TOGGLE_RADIUS,
            left: BETWEEN_TOGGLES * 2 - BETWEEN_TOGGLES * 2,
            display: "inline-flex",
            userSelect: "none",
            position: "relative"
          }}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleKnobXFramerMotion()
            // Keep the koala happy: (Example 3)
            cycleTrackBackgroundFramerMotion()
          }}
          animate={{ backgroundColor: trackBackgroundFramerMotion }}
        >
          <motion.div
            className="handle"
            animate={{ x: knobXFramerMotion }}
            transition={{ duration: 0.2 }} // transition changes from spring to ease
            style={{
              width: TOGGLE_HEIGHT, // Can't use "size" attribute
              height: TOGGLE_HEIGHT, // So need to set width and height
              borderRadius: TOGGLE_RADIUS,
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS,
              willChange: true
            }}
          >
            <span role="img" aria-label="Toggle handle">
              🐨
            </span>
          </motion.div>
        </motion.div>

        <motion.div // Example 4: Refactor using variants
          // motion.div is basically equivalent to Frame in Framer,
          // except most style elements need to be moved into the style tag
          className="toggle"
          style={{
            background: "lightslategray",
            width: TOGGLE_WIDTH,
            height: TOGGLE_HEIGHT,
            borderRadius: TOGGLE_RADIUS,
            left: BETWEEN_TOGGLES * 3 - BETWEEN_TOGGLES * 2,
            display: "inline-flex",
            userSelect: "none",
            position: "relative"
          }}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleToggleModeFramerMotion()
          }}
          animate={toggleModeFramerMotion}
          variants={{
            off: { backgroundColor: "rgb(119, 136, 153)" }, // lightslategray
            on: { backgroundColor: "rgb(255, 165, 0)" } // orange
          }}
        >
          <motion.div
            className="handle"
            // Specifying animate is optional because it is inherited
            // animate={toggleMode}
            variants={{
              off: { x: KNOB_START },
              on: { x: KNOB_END }
            }}
            transition={{ duration: 0.2 }} // transition changes from spring to ease
            style={{
              width: TOGGLE_HEIGHT, // Can't use "size" attribute
              height: TOGGLE_HEIGHT, // So need to set width and height
              borderRadius: TOGGLE_RADIUS,
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS,
              willChange: true
            }}
          >
            <span role="img" aria-label="Toggle handle">
              🐅
            </span>
          </motion.div>
        </motion.div>

        <motion.div // Example 5: Refactor using variants
          // motion.div is basically equivalent to Frame in Framer,
          // except most style elements need to be moved into the style tag
          className="toggle"
          style={{
            background: "lightslategray",
            width: TOGGLE_WIDTH * 1.5,
            height: TOGGLE_HEIGHT,
            borderRadius: TOGGLE_RADIUS,
            left: BETWEEN_TOGGLES * 4 - BETWEEN_TOGGLES * 2,
            display: "inline-flex",
            userSelect: "none",
            position: "relative"
          }}
          onTap={() => {
            // Needs to be in a function wrapper to prevent re-renders
            cycleToggleModeThreeWayFramerMotion()
          }}
          animate={toggleModeThreeWayFramerMotion}
          variants={{
            off: { backgroundColor: "rgb(255,0,0)" }, // red
            middle: { backgroundColor: "rgb(255,255,0)" }, // yellow
            on: { backgroundColor: "rgb(0,128,0)" } // green
          }}
        >
          <motion.div
            className="handle"
            // Specifying animate is optional because it is inherited
            // animate={toggleMode}
            variants={{
              off: { x: KNOB_START, backgroundColor: "rgb(255,255,255)" }, // white
              middle: { x: KNOB_END, backgroundColor: "rgb(211,211,211)" }, // lightgray
              on: { x: KNOB_END * 2, backgroundColor: "rgb(255,255,255)" } // white
            }}
            transition={{ duration: 0.2 }} // transition changes from spring to ease
            style={{
              width: TOGGLE_HEIGHT, // Can't use "size" attribute
              height: TOGGLE_HEIGHT, // So need to set width and height
              borderRadius: TOGGLE_RADIUS,
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: TOGGLE_RADIUS,
              willChange: true
            }}
          >
            <span role="img" aria-label="Toggle handle">
              🚦
            </span>
          </motion.div>
        </motion.div>

        <div
          className="otherExamples" // Examples from around the web
          style={{
            minHeight: TOGGLE_HEIGHT * 2,
            display: "flex-shrink"
          }}
        >
          <h1
            style={{
              backgroundColor: "lightblue",
              fontSize: TOGGLE_RADIUS * 1.2
            }}
          >
            Other examples
          </h1>
          {webExamples.map((item, link) => ListItem(item, link))}
        </div>
      </div>

      <h2
        style={{
          fontSize: TOGGLE_RADIUS * 0.8
        }}
      >
        Twitter.com/
        <a href="Twitter.com/derek_develops" style={{ color: "blue" }}>
          derek_develops
        </a>
        <br />
        Medium.com/
        <a href="https://Medium.com/@derek_develops" style={{ color: "blue" }}>
          @derek_develops
        </a>
        <br />
        GitHub.com/
        <a href="https://GitHub.com/djD-REK/" style={{ color: "blue" }}>
          djD-REK
        </a>
        /
        <a href="https://GitHub.com/djD-REK/framer" style={{ color: "blue" }}>
          framer
        </a>
        <br />
      </h2>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
