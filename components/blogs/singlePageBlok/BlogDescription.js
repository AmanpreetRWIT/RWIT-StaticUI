import { useEffect } from "react";
import Image from "next/legacy/image";

const getNodeText = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  if (!Array.isArray(node.content)) return "";
  return node.content.map(getNodeText).join("");
};

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const renderMarks = (text, marks = []) => {
  return marks.reduce((acc, mark, index) => {
    if (mark.type === "bold") {
      return <strong key={index}>{acc}</strong>;
    }

    if (mark.type === "italic") {
      return <em key={index}>{acc}</em>;
    }

    if (mark.type === "underline") {
      return <u key={index}>{acc}</u>;
    }

    if (mark.type === "strike") {
      return <s key={index}>{acc}</s>;
    }

    if (mark.type === "link") {
      const href = mark?.attrs?.href || "#";
      const target = mark?.attrs?.target || (href.startsWith("/") ? "_self" : "_blank");
      const rel = target === "_blank" ? "noopener nofollow" : undefined;

      return (
        <a key={index} href={href} target={target} rel={rel}>
          {acc}
        </a>
      );
    }

    return acc;
  }, text);
};

const renderNode = (node, key) => {
  if (!node) return null;

  if (node.type === "text") {
    return <>{renderMarks(node.text || "", node.marks)}</>;
  }

  if (node.type === "paragraph") {
    const hasOnlyImage =
      node?.content?.length === 1 && node?.content?.[0]?.type === "image";

    if (hasOnlyImage) {
      return <div key={key}>{renderNode(node.content[0], `${key}-img`)}</div>;
    }

    return (
      <p key={key}>
        {node?.content?.map((child, index) => (
          <span key={`${key}-${index}`}>{renderNode(child, `${key}-${index}`)}</span>
        ))}
      </p>
    );
  }

  if (node.type === "heading") {
    const level = node?.attrs?.level || 2;
    const text = getNodeText(node);
    const id = slugify(text);

    if (level === 2) {
      return (
        <h2 id={id} key={key}>
          {node?.content?.map((child, index) => (
            <span key={`${key}-${index}`}>{renderNode(child, `${key}-${index}`)}</span>
          ))}
        </h2>
      );
    }

    if (level === 3) {
      return (
        <h3 id={id} key={key}>
          {node?.content?.map((child, index) => (
            <span key={`${key}-${index}`}>{renderNode(child, `${key}-${index}`)}</span>
          ))}
        </h3>
      );
    }

    if (level === 4) {
      return (
        <h4 id={id} key={key}>
          {node?.content?.map((child, index) => (
            <span key={`${key}-${index}`}>{renderNode(child, `${key}-${index}`)}</span>
          ))}
        </h4>
      );
    }

    return (
      <h2 id={id} key={key}>
        {node?.content?.map((child, index) => (
          <span key={`${key}-${index}`}>{renderNode(child, `${key}-${index}`)}</span>
        ))}
      </h2>
    );
  }

  if (node.type === "bullet_list") {
    return (
      <ul key={key}>
        {node?.content?.map((child, index) => renderNode(child, `${key}-${index}`))}
      </ul>
    );
  }

  if (node.type === "ordered_list") {
    return (
      <ol key={key}>
        {node?.content?.map((child, index) => renderNode(child, `${key}-${index}`))}
      </ol>
    );
  }

  if (node.type === "list_item") {
    return (
      <li key={key}>
        {node?.content?.map((child, index) => (
          <div key={`${key}-${index}`}>{renderNode(child, `${key}-${index}`)}</div>
        ))}
      </li>
    );
  }

  if (node.type === "blockquote") {
    return (
      <blockquote key={key}>
        {node?.content?.map((child, index) => (
          <div key={`${key}-${index}`}>{renderNode(child, `${key}-${index}`)}</div>
        ))}
      </blockquote>
    );
  }

  if (node.type === "image") {
    const src = node?.attrs?.src;
    const alt = node?.attrs?.alt || "blog image";

    if (!src) return null;

    return (
      <div key={key} className="blog-image mb--30">
        <Image
          src={src}
          alt={alt}
          width={812}
          height={420}
          className="w-100"
        />
      </div>
    );
  }

  if (Array.isArray(node.content)) {
    return node.content.map((child, index) =>
      renderNode(child, `${key}-${index}`)
    );
  }

  return null;
};

const BlogDescription = ({ blok }) => {
  useEffect(() => {
    document?.querySelectorAll(".blog-desc a")?.forEach((link) => {
      const isInternal =
        link?.hostname === "www.rwit.io" ||
        link?.hostname === window.location.hostname ||
        !link?.hostname;

      link.target = isInternal ? "_self" : "_blank";

      if (!isInternal) {
        link.rel = "noopener nofollow";
      }
    });
  }, []);

  if (!blok?.description?.content) return null;

  return (
    <div className="blog-desc content mb--40 mb_sm--20 mb_md--20">
      {blok.description.content.map((node, index) =>
        renderNode(node, `${blok?._uid || "blog"}-${index}`)
      )}
    </div>
  );
};

export default BlogDescription;