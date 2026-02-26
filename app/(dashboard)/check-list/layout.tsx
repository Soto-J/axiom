export default function CheckListLayout({
  children,
}: LayoutProps<"/check-list">) {
  return <div className="max-w-3xl mx-auto">{children}</div>;
}
