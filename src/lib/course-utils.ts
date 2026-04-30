/**
 * Curriculum structure from database
 */
export interface CurriculumModule {
  title: string;
  order: number;
  topics: string[];
  notes?: string[];
  note?: string;
}

export interface CurriculumSection {
  order: number;
  title: string;
  modules: CurriculumModule[];
}

export interface ParsedCurriculumSection {
  title: string;
  modules: {
    title: string;
    topics: string[];
    notes: string[];
  }[];
}

export interface CourseReview {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

// Add to your existing course-utils.ts

export function getCourseReviewStats(reviews: CourseReview[]) {
  if (!reviews || reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const ratingDistribution = reviews.reduce(
    (acc, review) => {
      acc[review.rating as 1 | 2 | 3 | 4 | 5] =
        (acc[review.rating as 1 | 2 | 3 | 4 | 5] || 0) + 1;
      return acc;
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<1 | 2 | 3 | 4 | 5, number>,
  );

  return {
    totalReviews: reviews.length,
    averageRating,
    ratingDistribution,
  };
}

export function parseCurriculum(value: unknown): ParsedCurriculumSection[] {

  if (!value) return [];

  // Parse if it's a string
  let data = value;
  if (typeof value === "string") {
    try {
      data = JSON.parse(value);
    } catch {
      return [];
    }
  }

  // Handle the sections structure
  if (typeof data === "object" && data !== null && "sections" in data) {
    const curriculumData = data as { sections: CurriculumSection[] };

    return curriculumData.sections
      .sort((a, b) => a.order - b.order)
      .map((section) => ({
        title: section.title,
        modules: section.modules
          .sort((a, b) => a.order - b.order)
          .map((module) => ({
            title: module.title,
            topics: module.topics || [],
            notes: module.notes || (module.note ? [module.note] : []),
          })),
      }))
      .filter((section) => section.modules.length > 0);
  }

  return [];
}

/**
 * Projects structure from database
 */
export interface ProjectItem {
  id: string;
  icon?: string;
  tags: string[];
  title: string;
  duration?: string;
  tech_stack: string[];
  description?: string;
  image_url?: string;
  points?: string[];
  features?: string[];
}

export interface ProjectCategory {
  type: "LIVE" | "RECORDED" | "COMPANY";
  order: number;
  projects: ProjectItem[];
}

export interface ParsedProject {
  id: string;
  type: string;
  title: string;
  description?: string;
  duration?: string;
  techStack: string[];
  tags: string[];
  icon?: string;
  imageUrl?: string;
  points?: string[];
}

export function parseProjects(value: unknown): ParsedProject[] {

  if (!value) return [];

  let data = value;
  if (typeof value === "string") {
    try {
      data = JSON.parse(value);
    } catch {
      return [];
    }
  }

  // Handle array of project categories
  if (Array.isArray(data)) {
    const categories = data as ProjectCategory[];
    const allProjects: ParsedProject[] = [];

    categories
      .sort((a, b) => a.order - b.order)
      .forEach((category) => {
        category.projects.forEach((project) => {
          allProjects.push({
            id: project.id,
            type: category.type,
            title: project.title,
            description: project.description,
            duration: project.duration,
            techStack: project.tech_stack || [],
            tags: project.tags || [],
            icon: project.icon,
            imageUrl: project.image_url,
            points: project.features || project.points,
          });
        });
      });

    return allProjects;
  }

  return [];
}

/**
 * Certification structure from database
 */
export interface CertificationItem {
  title: string;
  subtitle?: string;
  is_verified?: boolean;
}

export function parseCertification(value: unknown): {
  title: string;
  subtitle?: string;
  isVerified?: boolean;
  imageUrl?: string;
} {
  const defaultTitle = "Certificate of Completion";
  const defaultSubtitle =
    "Upon successful completion of this course, you will receive a certificate of achievement that validates your skills and knowledge.";

  if (!value) {
    return { title: defaultTitle, subtitle: defaultSubtitle };
  }

  let data = value;
  if (typeof value === "string") {
    try {
      data = JSON.parse(value);
    } catch {
      return { title: defaultTitle, subtitle: value };
    }
  }

  // Handle array of certificates (get first one)
  if (Array.isArray(data) && data.length > 0) {
    const cert = data[0] as CertificationItem;
    return {
      title: cert.title || defaultTitle,
      subtitle: cert.subtitle || defaultSubtitle,
      isVerified: cert.is_verified,
    };
  }

  // Handle single certificate object
  if (typeof data === "object" && data !== null) {
    const cert = data as any;
    return {
      title: cert.title || defaultTitle,
      subtitle:
        cert.subtitle || cert.description || cert.text || defaultSubtitle,
      isVerified: cert.is_verified,
      imageUrl: cert.imageUrl || cert.image_url,
    };
  }

  return { title: defaultTitle, subtitle: defaultSubtitle };
}
