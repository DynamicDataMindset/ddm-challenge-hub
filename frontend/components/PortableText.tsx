import { PortableText as PortableTextReact } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/lib/urlFor";

interface PortableTextProps {
  content: PortableTextBlock[];
}

// Custom components for rendering different block types
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      
      return (
        <figure className="my-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden bg-github-bg-secondary">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-github-text-muted mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-github-text-primary mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-github-text-primary mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-github-text-primary mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-github-text-primary leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-github-accent-neon pl-4 py-2 my-6 italic text-github-text-secondary">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-github-text-primary">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-github-text-primary">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="px-2 py-1 rounded bg-github-bg-secondary text-github-accent-neon font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-github-accent-neon hover:text-github-accent-neonHover underline transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-github-text-primary ml-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-github-text-primary ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-github-text-primary">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-github-text-primary">{children}</li>
    ),
  },
};

export default function PortableText({ content }: PortableTextProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <PortableTextReact value={content} components={components} />
    </div>
  );
}