import React from "react";
import {
    IconBriefcase,
    IconBulb,
    IconSchool,
    IconWriting,
    IconMoodSmile,
    IconHeart,
} from "@tabler/icons-react";

const categories = [
    { icon: IconBriefcase, label: "Business" },
    { icon: IconSchool, label: "Education" },
    { icon: IconBulb, label: "Creative" },
    { icon: IconHeart, label: "Health" },
    { icon: IconWriting, label: "Journaling" },
    { icon: IconMoodSmile, label: "Communication" },
];

/**
 * A React functional component that renders a list of category links.
 * Each category is represented by an icon and a label.
 * The links are styled with Tailwind CSS classes and are responsive to dark mode.
 */

const CategoryLinks: React.FC = () => {
    return (
        <div className="mt-10 sm:mt-20">
            {categories.map(({ icon: Icon, label }) => (
                <a
                    key={label}
                    className="m-1 py-2 px-3 inline-flex 
                    items-center gap-x-2 text-sm font-medium 
                    rounded-lg border border-gray-200 
                    bg-white text-gray-800 shadow-sm hover:bg-green-500 hover:text-white
                    disabled:opacity-50 disabled:pointer-events-none"
                    href="#"
                >
                    <Icon size={18} />
                    {label}
                </a>
            ))}
        </div>
    );
};

export default CategoryLinks;
