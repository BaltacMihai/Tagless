export default function generateTags(tag, depth = 0) {
  const indent = " ".repeat(depth);

  switch (tag.tagType) {
    case "selfClose":
      return `${indent}<${tag.tagName}${generateTagAttributesString(
        tag.tagAttributes
      )}/>\n`;

    case "text":
      return `${indent}<${tag.tagName}${generateTagAttributesString(
        tag.tagAttributes
      )}> ${tag.content}</${tag.tagName}>\n`;

    case "media":
      return `${indent}<${tag.tagName}${generateTagAttributesString(
        tag.tagAttributes
      )}> ${tag.content}</${tag.tagName}>\n`;

    case "link":
      return `${indent}<${tag.tagName}${generateTagAttributesString(
        tag.tagAttributes
      )}> ${tag.content}</${tag.tagName}>\n`;

    case "container":
      return `${indent}<${tag.tagName}${generateTagAttributesString(
        tag.tagAttributes
      )}> \n${tag.content
        ?.map((tagChild) => generateTags(tagChild, depth + 2))
        .join("")}\n${indent} </${tag.tagName}> \n`;
  }
}

function generateTagAttributesString(tagAttributes) {
  const tagAttributesList = [];
  for (const [key, value] of Object.entries(tagAttributes)) {
    if (value && key != "custom") {
      tagAttributesList.push(`${key}="${value}"`);
    }
  }
  if (tagAttributes.custom) {
    tagAttributesList.push(tagAttributes.custom);
  }

  if (tagAttributesList.length != 0) {
    return " " + tagAttributesList.join(" ");
  } else return "";
}