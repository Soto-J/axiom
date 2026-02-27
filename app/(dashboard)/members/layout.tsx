export default function MembersLayout({
  children,
}: LayoutProps<"/members">) {
  return <div className="max-w-3xl mx-auto">{children}</div>;
}
