import { MockSiteRenderer } from "@/components/mock-site/mock-site-renderer";
import config from "@/data/config.json";
import type { MockSiteConfig } from "@/types/mock";

export default function Page() {
  return <MockSiteRenderer config={config as unknown as MockSiteConfig} />;
}
