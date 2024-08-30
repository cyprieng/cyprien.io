import "@styles/inventory.css";

export interface ListProps {
  children: React.ReactNode;
}

export interface ItemProps {
  href: string;
  alt: string;
  img: string;
  title: string;
  description: string;
}

export function InventoryList({ children }: ListProps) {
  return <div className="inventory-container">{children}</div>;
}

export function InventoryItem({
  href,
  alt,
  img,
  title,
  description,
}: ItemProps) {
  return (
    <a href={href}>
      <img alt={alt} src={img} />
      <p className="title">{title}</p>
      <p className="description">{description}</p>
    </a>
  );
}
