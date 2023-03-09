## TypeWriter Web Component

The TypeWriter web component is a simple and customizable typewriter effect element for your website or application.

![Alt Text](type-writer.gif)

## Installation

To integrate the TypeWriter web component into your application, simply download the typewriter.js file and add it to your HTML document:

```html
<script src="path/to/TypeWriter.js"></script>
```

Alternatively, you can also include the file via a CDN connection:

```html
<script src="#"></script>
<script type="module" src="#"></script>
```

## Usage

To use the TypeWriter web component, simply add the type-writer tag to your HTML document and customize the attributes as needed:

```html
<type-writer
  data-words='["Text 1", "Text 2", "Text 3", "Text 4"]'
  data-forward="200"
  data-backward="100"
  data-wait="2000"
  indicator="true"
  data-indicator-speed=".5s"
>
</type-writer>
```

## Attributes

The TypeWriter web component supports the following attributes:

- data-words: An array of words or phrases to be displayed. By default, the array ["First", "Second", "Third"] is used.
- data-wait: The pause time in milliseconds before the typewriter effect restarts. By default, it's 2000 milliseconds.
- data-forward: The delay time in milliseconds before a new letter is added. By default, it's 200 milliseconds.
- data-backward: The delay time in milliseconds before a letter is deleted. By default, it's 100 milliseconds.
- indicator: Specifies whether the blinking cursor should be displayed. By default, it's true.
- data-indicator-speed: The speed at which the blinking cursor blinks. By default, the speed is 0.75 seconds.

## Styling

The TypeWriter web component can be customized with CSS styles. You can use the following CSS variables to change the color, font, and font size:

```css
.type-writer {
  --color: #000;
  --background: none;
  --font-size: 1.5rem;
  --font-family: "Courier New", Courier, monospace;
  --indicator-width: 5px;
}
```

## Example

An example of using the TypeWriter web component can be found in the example.html file.
