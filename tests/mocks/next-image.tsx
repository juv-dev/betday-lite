import React from "react";

function MockImage(props: Record<string, unknown>) {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return React.createElement("img", props);
}

MockImage.displayName = "MockImage";

export default MockImage;
