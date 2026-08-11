import { Link, type LinkProps } from "react-router-dom";
import { useLangPath } from "../../hooks/useLangPath";

interface LocalizedLinkProps extends Omit<LinkProps, "to"> {
  to: string;
}

/** A router Link that keeps the current /en|de/ prefix intact. */
export function LocalizedLink({ to, ...rest }: LocalizedLinkProps) {
  const langPath = useLangPath();
  return <Link to={langPath(to)} {...rest} />;
}
