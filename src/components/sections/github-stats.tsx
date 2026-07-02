import { getGitHubStats } from "@/lib/github";
import { getContributionChartUrl } from "@/lib/github-chart";
import { SkillPill } from "@/components/shared/skill-pill";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import Image from "next/image";
import { Github, Star, Users } from "lucide-react";

export async function GitHubStats() {
  const stats = await getGitHubStats();

  if (!stats) {
    return (
      <p className="font-mono text-sm text-secondary">
        Unable to load GitHub stats.
      </p>
    );
  }

  const { user, topLanguages, totalStars } = stats;

  return (
    <AnimatedSection>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-secondary">
              <Users size={14} />
              Followers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-semibold text-primary">
              {user.followers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-secondary">
              <Star size={14} />
              Total Stars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-semibold text-primary">
              {totalStars}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-secondary">
              <Github size={14} />
              Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-semibold text-primary">
              {user.public_repos}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary">
              Top Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {topLanguages.map((lang) => (
                <SkillPill key={lang.name} name={lang.name} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-mono text-sm font-medium text-secondary">
          Contribution Graph
        </h3>
        <div className="overflow-hidden rounded-lg border border-border bg-background p-4">
          <Image
            src={getContributionChartUrl()}
            alt="GitHub contribution graph"
            width={800}
            height={120}
            className="w-full"
            unoptimized
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
