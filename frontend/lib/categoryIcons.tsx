import {
    Database,
    Code2,
    TrendingUp,
    BarChart3,
    Brain,
    Briefcase,
    BookOpen,
    Laptop,
    LineChart,
    PieChart,
    Table,
    FileSpreadsheet,
    Cpu,
    Activity,
    Layers,
    Cloud,
    Shield,
    Zap,
    Target,
    Users,
} from "lucide-react";

// Map category slugs to professional icons
export const categoryIcons: Record<string, React.ReactNode> = {
    sql: <Database className="w-5 h-5" />,
    python: <Code2 className="w-5 h-5" />,
    career: <Briefcase className="w-5 h-5" />,
    analytics: <BarChart3 className="w-5 h-5" />,
    "data-science": <Brain className="w-5 h-5" />,
    "data-engineering": <Cpu className="w-5 h-5" />,
    visualization: <PieChart className="w-5 h-5" />,
    "machine-learning": <Activity className="w-5 h-5" />,
    excel: <FileSpreadsheet className="w-5 h-5" />,
    bi: <LineChart className="w-5 h-5" />,
    cloud: <Cloud className="w-5 h-5" />,
    tutorials: <BookOpen className="w-5 h-5" />,
    tools: <Laptop className="w-5 h-5" />,
    statistics: <Target className="w-5 h-5" />,
    databases: <Table className="w-5 h-5" />,
    security: <Shield className="w-5 h-5" />,
    performance: <Zap className="w-5 h-5" />,
    team: <Users className="w-5 h-5" />,
    default: <Layers className="w-5 h-5" />, // Fallback icon
};

// Function to get icon for a category
export function getCategoryIcon(slug: string): React.ReactNode {
    if (!slug) return categoryIcons.default;
    return categoryIcons[slug.toLowerCase()] || categoryIcons.default;
}

// Color mapping for categories (if you want consistent colors)
export const categoryColors: Record<string, string> = {
    sql: "#3b82f6", // Blue
    python: "#10b981", // Green
    career: "#8b5cf6", // Purple
    analytics: "#f59e0b", // Orange
    "data-science": "#ec4899", // Pink
    "data-engineering": "#06b6d4", // Cyan
    visualization: "#f97316", // Orange
    "machine-learning": "#ef4444", // Red
    excel: "#22c55e", // Green
    bi: "#6366f1", // Indigo
    cloud: "#14b8a6", // Teal
    default: "#39FF14", // Neon green (your accent)
};

export function getCategoryColor(slug: string): string {
    if (!slug) return categoryColors.default;
    return categoryColors[slug.toLowerCase()] || categoryColors.default;
}