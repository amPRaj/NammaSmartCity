import PropertyListing from "./PropertyListing";

const PropertiesShowcase = () => {
    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
            <PropertyListing 
                showFilters={false}
                showSearch={true}
                maxProperties={8}
                featuredOnly={true}
                title="Featured Properties"
                showViewModeToggle={false}
            />
        </div>
    );
};

export default PropertiesShowcase;