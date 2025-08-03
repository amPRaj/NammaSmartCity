import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import { addProperty, updateProperty } from "../../supabase/propertyService";
import { uploadPropertyImages } from "../../supabase/propertyService";

const PropertyForm = ({ property, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        type: "apartment",
        bedrooms: "",
        bathrooms: "",
        area: "",
        amenities: [],
        featured: false,
        images: [],
        virtualTour: "",
        monthlyRent: "",
        yearBuilt: "",
        parking: "",
        furnishing: "unfurnished",
        // Property Details
        dimension: "",
        plotFacing: "",
        mainDoorFacing: "",
        roadWidth: "",
        downPayment: "",
        approvedBy: "",
        // Building Features
        floors: "",
        rooms: "",
        attachedBathrooms: "",
        commonBathrooms: "",
        parkingDetails: "",
        cementUsed: "",
        mainDoorWood: "",
        windowsWood: "",
        interiors: "",
        bathroomFittings: "",
        electricCables: "",
        switches: "",
        sumpCapacity: "",
        overheadTankCapacity: "",
        mainGate: "",
        railings: "",
        paintUsed: "",
        vaastu: "",
        // Nearby Amenities
        nearbySchools: "",
        nearbyHospitals: "",
        publicTransport: "",
        groceries: "",
        // Additional Services
        loanAssistance: "",
        legalDetails: "Clear Title Deeds and other Legal Documents. Legal Assistance will be provided for property related queries. All necessary approvals and clearances are in place. Property documents are verified and authenticated. No legal disputes or encumbrances on the property.",
        companyTerms: "Free Property Visits. Site inspection available at your convenience. Expert guidance throughout the buying process. Transparent pricing with no hidden charges. After-sales support and assistance. Quality construction with premium materials. Timely project completion guarantee."
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');
    const [previewImages, setPreviewImages] = useState([]);


    useEffect(() => {
        if (property) {
            setFormData(property);
            setPreviewImages(property.images || []);
        }
    }, [property]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleAmenitiesChange = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        console.log("Files selected:", files.length);

        if (files.length === 0) {
            console.log("No files selected");
            return;
        }

        setImageFiles(prev => {
            const newFiles = [...prev, ...files];
            console.log("Total files now:", newFiles.length);
            return newFiles;
        });

        // Create preview URLs
        files.forEach((file, index) => {
            console.log(`Processing file ${index}:`, file.name, file.size);
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(`Preview created for file ${index}`);
                setPreviewImages(prev => [...prev, e.target.result]);
            };
            reader.onerror = (error) => {
                console.error(`Error reading file ${index}:`, error);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Auto-fill templates
    const autoFillTemplates = {
        "luxury-villa": {
            title: "Luxury 3BHK Villa with Premium Amenities",
            description: "Stunning luxury villa with modern architecture and premium finishes in prime location",
            price: "85",
            location: "Saraswathi Nagar",
            type: "villa",
            bedrooms: "3",
            bathrooms: "4",
            area: "2500",
            amenities: ["Swimming Pool", "Gym", "Security", "Garden", "Parking", "Air Conditioning"],
            // Property Details
            dimension: "40*60",
            plotFacing: "south",
            mainDoorFacing: "east",
            roadWidth: "40 feet",
            downPayment: "25L",
            approvedBy: "Final approved",
            // Building Features
            floors: "2",
            rooms: "4",
            attachedBathrooms: "3",
            commonBathrooms: "1",
            parkingDetails: "2 cars + 2 bikes",
            cementUsed: "Ultratech",
            mainDoorWood: "1st Teak",
            windowsWood: "1st Teak",
            interiors: "Modular Kitchen, TV unit, wardrobes, PVC ceiling, wooden flooring",
            bathroomFittings: "Jaguar",
            electricCables: "Havells",
            switches: "Legrand",
            sumpCapacity: "15k liters",
            overheadTankCapacity: "2k liters",
            mainGate: "SS Steel",
            railings: "SS Railing",
            paintUsed: "Asian",
            vaastu: "Pakka Vaastu",
            // Nearby Amenities
            nearbySchools: "International School within 1km",
            nearbyHospitals: "Multi-speciality hospital 500m",
            publicTransport: "Bus & Metro connectivity",
            groceries: "Shopping mall within 200m",
            // Additional Services
            loanAssistance: "Up to 90% funding available. Hassle-free loan processing with leading banks. Expert assistance for documentation and approval process.",
            featured: true
        },
        "modern-apartment": {
            title: "Modern 2BHK Apartment in Prime Location",
            description: "Contemporary apartment with all modern amenities and excellent connectivity",
            price: "45",
            location: "Vidyanagar",
            type: "apartment",
            bedrooms: "2",
            bathrooms: "2",
            area: "1200",
            amenities: ["Elevator", "Security", "Parking", "Power Backup", "Water Supply"],
            // Property Details
            dimension: "30*40",
            plotFacing: "north",
            mainDoorFacing: "east",
            roadWidth: "30 feet",
            downPayment: "15L",
            approvedBy: "RERA approved",
            // Building Features
            floors: "1",
            rooms: "3",
            attachedBathrooms: "2",
            commonBathrooms: "0",
            parkingDetails: "1 car parking",
            cementUsed: "ACC",
            mainDoorWood: "Engineered Wood",
            windowsWood: "UPVC",
            interiors: "Modular Kitchen, built-in wardrobes",
            bathroomFittings: "Hindware",
            electricCables: "Polycab",
            switches: "Anchor",
            sumpCapacity: "8k liters",
            overheadTankCapacity: "1k liters",
            mainGate: "MS Steel",
            railings: "MS Railing",
            paintUsed: "Berger",
            vaastu: "Vaastu Compliant",
            // Nearby Amenities
            nearbySchools: "Government School 300m",
            nearbyHospitals: "Primary Health Center 400m",
            publicTransport: "Bus stop 100m",
            groceries: "Local market 150m"
        },
        "budget-house": {
            title: "Affordable 2BHK House for First-time Buyers",
            description: "Budget-friendly house with essential amenities perfect for small families",
            price: "25",
            location: "Nehru Nagar",
            type: "house",
            bedrooms: "2",
            bathrooms: "2",
            area: "900",
            amenities: ["Parking", "Water Supply", "Power Backup"],
            // Property Details
            dimension: "30*30",
            plotFacing: "east",
            mainDoorFacing: "north",
            roadWidth: "20 feet",
            downPayment: "8L",
            approvedBy: "Panchayat approved",
            // Building Features
            floors: "1",
            rooms: "3",
            attachedBathrooms: "1",
            commonBathrooms: "1",
            parkingDetails: "1 bike + open parking",
            cementUsed: "Shree",
            mainDoorWood: "2nd Teak",
            windowsWood: "Aluminum",
            interiors: "Basic kitchen, simple interiors",
            bathroomFittings: "Parryware",
            electricCables: "Finolex",
            switches: "GM",
            sumpCapacity: "5k liters",
            overheadTankCapacity: "500 liters",
            mainGate: "Iron",
            railings: "Iron Railing",
            paintUsed: "Nerolac",
            vaastu: "Partial Vaastu",
            // Nearby Amenities
            nearbySchools: "Government School 500m",
            nearbyHospitals: "PHC 1km",
            publicTransport: "Auto available",
            groceries: "Local shops 200m"
        },
        "commercial-space": {
            title: "Prime Commercial Space for Business",
            description: "Excellent commercial property in busy market area with high footfall",
            price: "60",
            location: "Car Street",
            type: "commercial",
            bedrooms: "0",
            bathrooms: "2",
            area: "800",
            amenities: ["Parking", "Security", "Power Backup"],
            // Property Details
            dimension: "20*40",
            plotFacing: "west",
            mainDoorFacing: "south",
            roadWidth: "40 feet",
            downPayment: "20L",
            approvedBy: "Commercial approved",
            // Building Features
            floors: "1",
            rooms: "2",
            attachedBathrooms: "0",
            commonBathrooms: "2",
            parkingDetails: "Customer parking available",
            cementUsed: "Ambuja",
            mainDoorWood: "Commercial grade",
            windowsWood: "Aluminum",
            interiors: "Open space, false ceiling",
            bathroomFittings: "Standard",
            electricCables: "Heavy duty wiring",
            switches: "Industrial grade",
            sumpCapacity: "3k liters",
            overheadTankCapacity: "1k liters",
            mainGate: "Rolling shutter",
            railings: "Commercial railing",
            paintUsed: "Commercial paint",
            vaastu: "Commercial Vaastu",
            // Nearby Amenities
            nearbySchools: "Not applicable",
            nearbyHospitals: "Hospital 200m",
            publicTransport: "Bus & auto hub",
            groceries: "Market area"
        },
        "residential-plot": {
            title: "DTCP Approved Residential Plot",
            description: "Ready to construct residential plot with all approvals and utilities",
            price: "35",
            location: "BDA Layout",
            type: "plot",
            bedrooms: "0",
            bathrooms: "0",
            area: "1200",
            amenities: ["Water Supply", "Electricity Connection"],
            // Property Details
            dimension: "30*40",
            plotFacing: "north",
            mainDoorFacing: "",
            roadWidth: "30 feet",
            downPayment: "12L",
            approvedBy: "DTCP approved",
            // Building Features
            floors: "",
            rooms: "",
            attachedBathrooms: "",
            commonBathrooms: "",
            parkingDetails: "Space for 2 cars",
            cementUsed: "",
            mainDoorWood: "",
            windowsWood: "",
            interiors: "",
            bathroomFittings: "",
            electricCables: "Connection available",
            switches: "",
            sumpCapacity: "",
            overheadTankCapacity: "",
            mainGate: "Compound wall",
            railings: "",
            paintUsed: "",
            vaastu: "Vaastu compliant plot",
            // Nearby Amenities
            nearbySchools: "Proposed school 500m",
            nearbyHospitals: "Hospital 1km",
            publicTransport: "Bus connectivity",
            groceries: "Shopping complex planned"
        }
    };

    const handleAutoFill = (e) => {
        const templateKey = e.target.value;
        if (templateKey && autoFillTemplates[templateKey]) {
            const template = autoFillTemplates[templateKey];
            setFormData(prev => ({
                ...prev,
                ...template
            }));
            // Reset the dropdown
            e.target.value = "";

            // Show success message
            alert(`✅ Auto-filled with ${templateKey.replace('-', ' ')} template!`);
        }
    };

    // Enhanced Smart Auto-Fill function that analyzes structured description with emojis
    const handleSmartAutoFill = () => {
        const description = formData.description;
        const descriptionLower = description.toLowerCase();
        let extractedData = {};

        // Extract title from first line
        const titleMatch = description.match(/^([^@\n]+)/);
        if (titleMatch) {
            extractedData.title = titleMatch[1].trim();
        }

        // Extract price from title or description
        const priceMatch = description.match(/(\d+)\s*lakhs?/i);
        if (priceMatch) extractedData.price = priceMatch[1];

        // Extract property type
        if (descriptionLower.includes('villa')) extractedData.type = 'villa';
        else if (descriptionLower.includes('apartment') || descriptionLower.includes('flat')) extractedData.type = 'apartment';
        else if (descriptionLower.includes('house')) extractedData.type = 'house';
        else if (descriptionLower.includes('commercial') || descriptionLower.includes('shop') || descriptionLower.includes('office')) extractedData.type = 'commercial';
        else if (descriptionLower.includes('plot') || descriptionLower.includes('land')) extractedData.type = 'plot';

        // Extract dimension
        const dimensionMatch = description.match(/dimension:\s*(\d+\s*[*×x]\s*\d+)/i);
        if (dimensionMatch) extractedData.dimension = dimensionMatch[1].replace(/\s+/g, '');

        // Extract plot facing
        const plotFacingMatch = description.match(/plot facing:\s*(\w+)/i);
        if (plotFacingMatch) extractedData.plotFacing = plotFacingMatch[1].toLowerCase();

        // Extract main door facing
        const mainDoorFacingMatch = description.match(/main door facing:\s*(\w+)/i);
        if (mainDoorFacingMatch) extractedData.mainDoorFacing = mainDoorFacingMatch[1].toLowerCase();

        // Extract location
        const locationMatch = description.match(/location:\s*([^🛣️📄\n]+)/i);
        if (locationMatch) {
            let rawLocation = locationMatch[1].trim();

            // List of Davanagere areas (alphabetically ascending order)
            const davanagereAreas = [
                'azad nagar',
                'bapuji bazaar',
                'basaveshwar nagar',
                'car street',
                'doddapet',
                'indira nagar',
                'mcc a block',
                'mcc b block',
                'nehru nagar',
                'p j extension',
                'saraswathi nagar',
                'shamanur road',
                'shanthinagar',
                'siddaganga layout',
                'siddganga badavane',
                'vidyanagar',
                'vinobanagar'
            ];

            // Check if the location matches any known Davanagere area
            const matchedArea = davanagereAreas.find(area =>
                rawLocation.toLowerCase().includes(area) ||
                area.includes(rawLocation.toLowerCase())
            );

            if (matchedArea) {
                // Format the matched area with proper capitalization
                extractedData.location = matchedArea.split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
            } else {
                // Use the raw location with proper capitalization
                extractedData.location = rawLocation.split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
            }
        }

        // Extract road width
        const roadWidthMatch = description.match(/road width:\s*([^📄⸻\n]+)/i);
        if (roadWidthMatch) extractedData.roadWidth = roadWidthMatch[1].trim();

        // Extract approval
        const approvalMatch = description.match(/approved by:\s*([^⸻\n]+)/i);
        if (approvalMatch) extractedData.approvedBy = approvalMatch[1].trim();

        // Extract floors
        const floorsMatch = description.match(/no\.\s*of floors:\s*(\d+)/i);
        if (floorsMatch) extractedData.floors = floorsMatch[1];

        // Extract rooms
        const roomsMatch = description.match(/no\.\s*of rooms:\s*(\d+)/i);
        if (roomsMatch) {
            extractedData.rooms = roomsMatch[1];
            extractedData.bedrooms = roomsMatch[1]; // Also set bedrooms
        }

        // Extract bathrooms
        const attachedBathroomsMatch = description.match(/attached bathrooms:\s*(\d+)/i);
        if (attachedBathroomsMatch) extractedData.attachedBathrooms = attachedBathroomsMatch[1];

        const commonBathroomsMatch = description.match(/common bathrooms:\s*(\d+)/i);
        if (commonBathroomsMatch) extractedData.commonBathrooms = commonBathroomsMatch[1];

        // Calculate total bathrooms
        if (attachedBathroomsMatch && commonBathroomsMatch) {
            const total = parseInt(attachedBathroomsMatch[1]) + parseInt(commonBathroomsMatch[1]);
            extractedData.bathrooms = total.toString();
        } else if (attachedBathroomsMatch) {
            extractedData.bathrooms = attachedBathroomsMatch[1];
        } else if (commonBathroomsMatch) {
            extractedData.bathrooms = commonBathroomsMatch[1];
        }

        // Extract parking
        const parkingMatch = description.match(/parking facility:\s*([^🏗️\n]+)/i);
        if (parkingMatch) extractedData.parkingDetails = parkingMatch[1].trim();

        // Extract cement
        const cementMatch = description.match(/cement used:\s*([^🚪\n]+)/i);
        if (cementMatch) extractedData.cementUsed = cementMatch[1].trim();

        // Extract wood types
        const mainDoorWoodMatch = description.match(/wood for main door & pooja:\s*([^🚪\n]+)/i);
        if (mainDoorWoodMatch) extractedData.mainDoorWood = mainDoorWoodMatch[1].trim();

        const windowsWoodMatch = description.match(/wood for windows & other doors:\s*([^🪟\n]+)/i);
        if (windowsWoodMatch) extractedData.windowsWood = windowsWoodMatch[1].trim();

        // Extract interiors
        const interiorsMatch = description.match(/interiors:\s*([^🔌\n]+)/i);
        if (interiorsMatch) extractedData.interiors = interiorsMatch[1].trim();

        // Extract electric cables
        const cablesMatch = description.match(/electric cables:\s*([^🔘\n]+)/i);
        if (cablesMatch) extractedData.electricCables = cablesMatch[1].trim();

        // Extract switches
        const switchesMatch = description.match(/switches:\s*([^🚰\n]+)/i);
        if (switchesMatch) extractedData.switches = switchesMatch[1].trim();

        // Extract sump capacity
        const sumpMatch = description.match(/sump capacity:\s*([^💧\n]+)/i);
        if (sumpMatch) extractedData.sumpCapacity = sumpMatch[1].trim();

        // Extract overhead tank
        const tankMatch = description.match(/overhead tank capacity:\s*([^🚪\n]+)/i);
        if (tankMatch) extractedData.overheadTankCapacity = tankMatch[1].trim();

        // Extract main gate
        const gateMatch = description.match(/main gate:\s*([^🛠️\n]+)/i);
        if (gateMatch) extractedData.mainGate = gateMatch[1].trim();

        // Extract railings
        const railingsMatch = description.match(/railings:\s*([^🎨\n]+)/i);
        if (railingsMatch) extractedData.railings = railingsMatch[1].trim();

        // Extract paint
        const paintMatch = description.match(/paint used:\s*([^🧭\n]+)/i);
        if (paintMatch) extractedData.paintUsed = paintMatch[1].trim();

        // Extract vaastu
        const vaastuMatch = description.match(/vaastu:\s*([^\n]+)/i);
        if (vaastuMatch) extractedData.vaastu = vaastuMatch[1].trim();

        // Calculate area from dimension (30*40 = 1200 sq ft)
        if (extractedData.dimension) {
            const dimMatch = extractedData.dimension.match(/(\d+)\*(\d+)/);
            if (dimMatch) {
                const area = parseInt(dimMatch[1]) * parseInt(dimMatch[2]);
                extractedData.area = area.toString();
            }
        }

        // Set default amenities for house type
        extractedData.amenities = ['Parking', 'Water Supply', 'Power Backup'];

        // Apply extracted data to form
        setFormData(prev => ({
            ...prev,
            ...extractedData
        }));

        // Show success message with extracted fields
        const extractedFields = Object.keys(extractedData);
        if (extractedFields.length > 0) {
            alert(`🤖 Smart Fill completed! Extracted ${extractedFields.length} fields: ${extractedFields.join(', ')}`);
        } else {
            alert('🤖 No specific property details found in description. Try adding more details like BHK, area, price, materials, etc.');
        }
    };

    // Function to generate comprehensive description
    const generateComprehensiveDescription = () => {
        let description = formData.description || "";

        // Add property details section
        let propertyDetails = "\n\n📍 PROPERTY DETAILS\n";
        if (formData.dimension) propertyDetails += `📐 Dimension: ${formData.dimension}\n`;
        if (formData.plotFacing) propertyDetails += `➡️ Plot Facing: ${formData.plotFacing}\n`;
        if (formData.mainDoorFacing) propertyDetails += `🚪 Main Door Facing: ${formData.mainDoorFacing}\n`;
        if (formData.roadWidth) propertyDetails += `🛣️ Road Width: ${formData.roadWidth}\n`;
        if (formData.downPayment) propertyDetails += `💰 Down Payment: ${formData.downPayment}\n`;
        if (formData.approvedBy) propertyDetails += `📄 Approved by: ${formData.approvedBy}\n`;

        // Add building features section
        let buildingFeatures = "\n🏠 BUILDING FEATURES\n";
        if (formData.floors) buildingFeatures += `🏢 No. of Floors: ${formData.floors}\n`;
        if (formData.rooms) buildingFeatures += `🛏️ No. of Rooms: ${formData.rooms}\n`;
        if (formData.attachedBathrooms) buildingFeatures += `🚿 Attached Bathrooms: ${formData.attachedBathrooms}\n`;
        if (formData.commonBathrooms) buildingFeatures += `🚽 Common Bathrooms: ${formData.commonBathrooms}\n`;
        if (formData.parkingDetails) buildingFeatures += `🚗 Parking Facility: ${formData.parkingDetails}\n`;
        if (formData.cementUsed) buildingFeatures += `🏗️ Cement Used: ${formData.cementUsed}\n`;
        if (formData.mainDoorWood) buildingFeatures += `🚪 Wood for Main Door & Pooja: ${formData.mainDoorWood}\n`;
        if (formData.windowsWood) buildingFeatures += `🚪 Wood for Windows & Other Doors: ${formData.windowsWood}\n`;
        if (formData.interiors) buildingFeatures += `🪟 Interiors: ${formData.interiors}\n`;
        if (formData.bathroomFittings) buildingFeatures += `🚿 Bathroom Fittings: ${formData.bathroomFittings}\n`;
        if (formData.electricCables) buildingFeatures += `🔌 Electric Cables: ${formData.electricCables}\n`;
        if (formData.switches) buildingFeatures += `🔘 Switches: ${formData.switches}\n`;
        if (formData.sumpCapacity) buildingFeatures += `🚰 Sump Capacity: ${formData.sumpCapacity}\n`;
        if (formData.overheadTankCapacity) buildingFeatures += `💧 Overhead Tank Capacity: ${formData.overheadTankCapacity}\n`;
        if (formData.mainGate) buildingFeatures += `🚪 Main Gate: ${formData.mainGate}\n`;
        if (formData.railings) buildingFeatures += `🛠️ Railings: ${formData.railings}\n`;
        if (formData.paintUsed) buildingFeatures += `🎨 Paint Used: ${formData.paintUsed}\n`;
        if (formData.vaastu) buildingFeatures += `🧭 Vaastu: ${formData.vaastu}\n`;

        // Add nearby amenities section
        let nearbyAmenities = "\n🌟 NEARBY AMENITIES\n";
        if (formData.nearbySchools) nearbyAmenities += `🏫 Schools & Colleges: ${formData.nearbySchools}\n`;
        if (formData.nearbyHospitals) nearbyAmenities += `🏥 Hospital: ${formData.nearbyHospitals}\n`;
        if (formData.publicTransport) nearbyAmenities += `🚌 Public Transport: ${formData.publicTransport}\n`;
        if (formData.groceries) nearbyAmenities += `🛒 Groceries/Dairy: ${formData.groceries}\n`;

        // Add additional services section
        let additionalServices = "\n💼 ADDITIONAL SERVICES\n";
        if (formData.loanAssistance) additionalServices += `💳 Loan Assistance: ${formData.loanAssistance}\n`;
        if (formData.legalDetails) additionalServices += `📋 Legal Details: ${formData.legalDetails}\n`;
        if (formData.companyTerms) additionalServices += `🏢 Company T&C: ${formData.companyTerms}\n`;

        // Combine all sections (only add sections that have content)
        let comprehensiveDescription = description;
        if (propertyDetails.length > 25) comprehensiveDescription += propertyDetails;
        if (buildingFeatures.length > 25) comprehensiveDescription += buildingFeatures;
        if (nearbyAmenities.length > 25) comprehensiveDescription += nearbyAmenities;
        if (additionalServices.length > 35) comprehensiveDescription += additionalServices;

        return comprehensiveDescription;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrls = formData.images || [];
            console.log("Starting form submission...");
            console.log("Existing images:", imageUrls.length);
            console.log("New image files to upload:", imageFiles.length);

            // Upload new images if any with fast upload
            if (imageFiles.length > 0) {
                // Set loading to true and show upload progress immediately
                setLoading(true);
                setUploadStatus(`🚀 Fast uploading ${imageFiles.length} images...`);
                setUploadProgress(5);

                console.log("🚀 Starting fast upload process...");
                const tempId = property?.id || Date.now().toString();

                // Use Supabase Storage upload
                const uploadResult = await uploadPropertyImages(imageFiles, tempId);

                console.log("🚀 Supabase upload result:", uploadResult);

                if (uploadResult.success) {
                    // Get URLs from Supabase upload response
                    imageUrls = [...imageUrls, ...uploadResult.urls];
                    console.log("✅ Total images after upload:", imageUrls.length);

                    if (uploadResult.mock) {
                        console.log("📱 Images stored locally (fallback)");
                        setUploadStatus("📱 Images stored locally - Ready to save!");
                    } else {
                        console.log("☁️ Images uploaded to Supabase successfully");
                        setUploadStatus("☁️ Images uploaded successfully - Ready to save!");
                    }
                    setUploadProgress(100);

                    // Reset upload status after a short delay to show success
                    setTimeout(() => {
                        setUploadStatus("");
                        setUploadProgress(0);
                    }, 2000);
                } else {
                    console.error("💥 Supabase upload failed:", uploadResult.error);
                    setUploadStatus("❌ Upload failed - but you can still save with existing images");
                    setUploadProgress(0);

                    // Don't block saving - user can add images later
                    const continueAnyway = window.confirm(
                        "Image upload failed, but you can still save the property and add images later. Continue?"
                    );
                    if (!continueAnyway) {
                        setLoading(false);
                        return;
                    }
                }
            }

            // Generate comprehensive description with all details
            const comprehensiveDescription = generateComprehensiveDescription();

            const propertyData = {
                ...formData,
                description: comprehensiveDescription, // Use the comprehensive description
                price: parseFloat(formData.price),
                bedrooms: parseInt(formData.bedrooms),
                bathrooms: parseInt(formData.bathrooms),
                area: parseFloat(formData.area),
                monthlyRent: formData.monthlyRent ? parseFloat(formData.monthlyRent) : null,
                yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : null,
                parking: formData.parking ? parseInt(formData.parking) : null,
                images: imageUrls
            };

            console.log("Saving property with data:", propertyData);

            // Update status to show we're saving to Firebase
            setUploadStatus("💾 Saving property to Firebase...");
            setUploadProgress(95);

            let result;
            try {
                console.log("🔥 Step 1: Images uploaded to Supabase Storage ✅");
                console.log("🔥 Step 2: Saving property data to Supabase...");

                if (property?.id) {
                    console.log("📝 Updating existing property:", property.id);
                    result = await updateProperty(property.id, propertyData);
                } else {
                    console.log("➕ Adding new property to Firebase...");
                    result = await addProperty(propertyData);
                }

                console.log("📊 Firebase save result:", result);

                if (result && result.success) {
                    console.log("✅ SUCCESS! Property saved to Firebase");
                    setUploadStatus("✅ Property saved successfully!");
                    setUploadProgress(100);

                    // Show detailed success message
                    const successMessage = `✅ Property Saved Successfully!\n\n` +
                        `📄 Title: ${propertyData.title}\n` +
                        `💰 Price: ₹${propertyData.price} Lakhs\n` +
                        `📍 Location: ${propertyData.location}\n` +
                        `🖼️ Images: ${propertyData.images?.length || 0} uploaded to Supabase Storage\n` +
                        `🔥 Data: Stored in Supabase Database\n\n` +
                        `${result.message || 'Ready to display on website!'}`;

                    alert(successMessage);

                    // Close form after brief delay
                    setTimeout(() => {
                        onSave();
                        onClose();
                    }, 1000);
                } else {
                    console.error("❌ Failed to save property:", result?.error);
                    setUploadStatus("❌ Failed to save to Firebase");
                    setUploadProgress(0);
                    alert(`❌ Failed to save property to Firebase:\n\n${result?.error || "Unknown error"}\n\nPlease check your Firebase configuration and try again.`);
                }
            } catch (saveError) {
                console.error("Error during property save:", saveError);
                setUploadStatus("❌ Error saving property");
                setUploadProgress(0);

                if (saveError.message.includes('timed out')) {
                    alert("Save operation timed out. Please check your internet connection and try again.");
                } else {
                    alert("Error saving property: " + saveError.message);
                }
            }
        } catch (error) {
            console.error("Error saving property:", error);
            alert("Error saving property: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const amenitiesList = [
        "Swimming Pool", "Gym", "Parking", "Security", "Garden", "Balcony",
        "Air Conditioning", "Elevator", "Power Backup", "Water Supply",
        "Internet", "Club House", "Children's Play Area", "Jogging Track"
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {property ? "Edit Property" : "Add New Property"}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Fill in the property details or use auto-fill templates
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <select
                                onChange={handleAutoFill}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                                defaultValue=""
                            >
                                <option value="">🚀 Auto Fill Templates</option>
                                <option value="luxury-villa">🏡 Luxury Villa</option>
                                <option value="modern-apartment">🏢 Modern Apartment</option>
                                <option value="budget-house">🏘️ Budget House</option>
                                <option value="commercial-space">🏬 Commercial Space</option>
                                <option value="residential-plot">🌍 Residential Plot</option>
                            </select>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Information Section */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            🏡 Basic Property Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🏷️ Property Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Luxury 3BHK Villa in Prime Location"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    💰 Price (₹ in Lakhs)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 50 (for ₹50 Lakhs)"
                                        step="0.1"
                                        min="0"
                                        className="w-full px-4 py-3 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Lakhs</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Enter amount in lakhs (e.g., 50 = ₹50,00,000)
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📝 Description
                            </label>
                            <div className="relative">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Describe the property features, location benefits, and unique selling points..."
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {formData.description && formData.description.length > 50 && (
                                    <button
                                        type="button"
                                        onClick={handleSmartAutoFill}
                                        className="absolute top-2 right-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 shadow-lg hover:shadow-xl"
                                    >
                                        <span>🤖</span>
                                        <span>Smart Fill</span>
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Write a detailed description and click "Smart Fill" to auto-populate form fields
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📍 Location
                                </label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select Location in Davanagere</option>

                                    {/* Central Areas */}
                                    <optgroup label="🏛️ Central Davanagere">
                                        <option value="MCC A Block">MCC A Block</option>
                                        <option value="MCC B Block">MCC B Block</option>
                                        <option value="P J Extension">P J Extension</option>
                                        <option value="Vidyanagar">Vidyanagar</option>
                                        <option value="Shamanur Road">Shamanur Road</option>
                                        <option value="Basha Circle">Basha Circle</option>
                                        <option value="Anjaneya Temple Road">Anjaneya Temple Road</option>
                                        <option value="Kondajji Circle">Kondajji Circle</option>
                                        <option value="Shivaji Circle">Shivaji Circle</option>
                                        <option value="Gandhi Circle">Gandhi Circle</option>
                                    </optgroup>

                                    {/* Residential Areas */}
                                    <optgroup label="🏘️ Residential Areas">
                                        <option value="Saraswathi Nagar">Saraswathi Nagar</option>
                                        <option value="Vinobanagar">Vinobanagar</option>
                                        <option value="Shanthinagar">Shanthinagar</option>
                                        <option value="Azad Nagar">Azad Nagar</option>
                                        <option value="Nehru Nagar">Nehru Nagar</option>
                                        <option value="Indira Nagar">Indira Nagar</option>
                                        <option value="Rajiv Nagar">Rajiv Nagar</option>
                                        <option value="Mahatma Gandhi Nagar">Mahatma Gandhi Nagar</option>
                                        <option value="Subhash Nagar">Subhash Nagar</option>
                                        <option value="Basaveshwar Nagar">Basaveshwar Nagar</option>
                                        <option value="Ambedkar Nagar">Ambedkar Nagar</option>
                                        <option value="Vivekananda Nagar">Vivekananda Nagar</option>
                                        <option value="Kuvempu Nagar">Kuvempu Nagar</option>
                                        <option value="Raghavendra Colony">Raghavendra Colony</option>
                                        <option value="Sai Nagar">Sai Nagar</option>
                                        <option value="Lakshmi Nagar">Lakshmi Nagar</option>
                                        <option value="Gayathri Nagar">Gayathri Nagar</option>
                                        <option value="Anand Nagar">Anand Nagar</option>
                                        <option value="Shivakumar Swamy Layout">Shivakumar Swamy Layout</option>
                                        <option value="Nittuvalli">Nittuvalli</option>
                                    </optgroup>

                                    {/* Commercial Areas */}
                                    <optgroup label="🏬 Commercial Areas">
                                        <option value="Car Street">Car Street</option>
                                        <option value="Bapuji Bazaar">Bapuji Bazaar</option>
                                        <option value="Cotton Market">Cotton Market</option>
                                        <option value="Doddapet">Doddapet</option>
                                        <option value="Shivappa Nayaka Circle">Shivappa Nayaka Circle</option>
                                        <option value="Lokikere Road">Lokikere Road</option>
                                        <option value="Honnali Road">Honnali Road</option>
                                        <option value="Harihara Road">Harihara Road</option>
                                        <option value="Channagiri Road">Channagiri Road</option>
                                        <option value="Jagalur Road">Jagalur Road</option>
                                    </optgroup>

                                    {/* Educational Areas */}
                                    <optgroup label="🎓 Educational Areas">
                                        <option value="University Area">University Area</option>
                                        <option value="Bapuji Institute Area">Bapuji Institute Area</option>
                                        <option value="SS Institute Area">SS Institute Area</option>
                                        <option value="UBDT College Area">UBDT College Area</option>
                                        <option value="Government College Area">Government College Area</option>
                                        <option value="Sharada Vilas College Area">Sharada Vilas College Area</option>
                                    </optgroup>

                                    {/* Industrial Areas */}
                                    <optgroup label="🏭 Industrial Areas">
                                        <option value="Industrial Estate">Industrial Estate</option>
                                        <option value="KIADB Industrial Area">KIADB Industrial Area</option>
                                        <option value="Textile Mill Area">Textile Mill Area</option>
                                        <option value="Mayurbhanj Complex">Mayurbhanj Complex</option>
                                    </optgroup>

                                    {/* Outskirts & Suburbs */}
                                    <optgroup label="🌳 Outskirts & Suburbs">
                                        <option value="Kunduvada">Kunduvada</option>
                                        <option value="Bethur">Bethur</option>
                                        <option value="Anaji">Anaji</option>
                                        <option value="Kondajji">Kondajji</option>
                                        <option value="Sante Bennur">Sante Bennur</option>
                                        <option value="Hadadi">Hadadi</option>
                                        <option value="Malebennur">Malebennur</option>
                                        <option value="Avaragere">Avaragere</option>
                                        <option value="Honnavalli">Honnavalli</option>
                                        <option value="Shivamogga Road">Shivamogga Road</option>
                                        <option value="Bangalore Road">Bangalore Road</option>
                                        <option value="Chitradurga Road">Chitradurga Road</option>
                                    </optgroup>

                                    {/* New Developments */}
                                    <optgroup label="🏗️ New Developments">
                                        <option value="APMC Layout">APMC Layout</option>
                                        <option value="BDA Layout">BDA Layout</option>
                                        <option value="HUDCO Layout">HUDCO Layout</option>
                                        <option value="Akshaya Layout">Akshaya Layout</option>
                                        <option value="Pragathi Layout">Pragathi Layout</option>
                                        <option value="Siddaganga Layout">Siddaganga Layout</option>
                                        <option value="Siddganga Badavane">Siddganga Badavane</option>
                                        <option value="Vinayaka Layout">Vinayaka Layout</option>
                                        <option value="Manjunatha Layout">Manjunatha Layout</option>
                                        <option value="Ganesha Layout">Ganesha Layout</option>
                                        <option value="Durga Layout">Durga Layout</option>
                                        <option value="Lakshmi Layout">Lakshmi Layout</option>
                                    </optgroup>

                                    {/* Temple Areas */}
                                    <optgroup label="🛕 Temple Areas">
                                        <option value="Durgambika Temple Area">Durgambika Temple Area</option>
                                        <option value="Anjaneya Temple Area">Anjaneya Temple Area</option>
                                        <option value="Kondajji Temple Area">Kondajji Temple Area</option>
                                        <option value="Siddeshwara Temple Area">Siddeshwara Temple Area</option>
                                        <option value="Kalika Devi Temple Area">Kalika Devi Temple Area</option>
                                    </optgroup>

                                    {/* Other Areas */}
                                    <optgroup label="📍 Other Areas">
                                        <option value="Railway Station Area">Railway Station Area</option>
                                        <option value="Bus Stand Area">Bus Stand Area</option>
                                        <option value="District Hospital Area">District Hospital Area</option>
                                        <option value="Collectorate Area">Collectorate Area</option>
                                        <option value="Court Complex Area">Court Complex Area</option>
                                        <option value="Stadium Area">Stadium Area</option>
                                        <option value="Park Area">Park Area</option>
                                        <option value="Lake View Area">Lake View Area</option>
                                    </optgroup>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🏠 Property Type
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="apartment">🏢 Apartment</option>
                                    <option value="villa">🏡 Villa</option>
                                    <option value="house">🏘️ House</option>
                                    <option value="commercial">🏬 Commercial</option>
                                    <option value="plot">🌍 Plot</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📐 Area (sq ft)
                                </label>
                                <input
                                    type="number"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 1200"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Property Configuration Section */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            🛏️ Property Configuration
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🛏️ Bedrooms
                                </label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 3"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🚿 Bathrooms
                                </label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🚗 Parking
                                </label>
                                <input
                                    type="number"
                                    name="parking"
                                    value={formData.parking}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🏗️ Year Built
                                </label>
                                <input
                                    type="number"
                                    name="yearBuilt"
                                    value={formData.yearBuilt}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2023"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Property Details Section */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📍 Property Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        📐 Dimension
                                    </label>
                                    <input
                                        type="text"
                                        name="dimension"
                                        value={formData.dimension}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 30*40"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        ➡️ Plot Facing
                                    </label>
                                    <select
                                        name="plotFacing"
                                        value={formData.plotFacing}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Direction</option>
                                        <option value="north">North</option>
                                        <option value="south">South</option>
                                        <option value="east">East</option>
                                        <option value="west">West</option>
                                        <option value="northeast">North East</option>
                                        <option value="northwest">North West</option>
                                        <option value="southeast">South East</option>
                                        <option value="southwest">South West</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚪 Main Door Facing
                                    </label>
                                    <select
                                        name="mainDoorFacing"
                                        value={formData.mainDoorFacing}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Direction</option>
                                        <option value="north">North</option>
                                        <option value="south">South</option>
                                        <option value="east">East</option>
                                        <option value="west">West</option>
                                        <option value="northeast">North East</option>
                                        <option value="northwest">North West</option>
                                        <option value="southeast">South East</option>
                                        <option value="southwest">South West</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🛣️ Road Width
                                    </label>
                                    <input
                                        type="text"
                                        name="roadWidth"
                                        value={formData.roadWidth}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 30 feet"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        💰 Down Payment
                                    </label>
                                    <input
                                        type="text"
                                        name="downPayment"
                                        value={formData.downPayment}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 20L"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        📄 Approved by
                                    </label>
                                    <input
                                        type="text"
                                        name="approvedBy"
                                        value={formData.approvedBy}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Final approved"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Building Features Section */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🏠 Building Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🏢 No. of Floors
                                    </label>
                                    <input
                                        type="number"
                                        name="floors"
                                        value={formData.floors}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🛏️ No. of Rooms
                                    </label>
                                    <input
                                        type="number"
                                        name="rooms"
                                        value={formData.rooms}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚿 Attached Bathrooms
                                    </label>
                                    <input
                                        type="number"
                                        name="attachedBathrooms"
                                        value={formData.attachedBathrooms}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚽 Common Bathrooms
                                    </label>
                                    <input
                                        type="number"
                                        name="commonBathrooms"
                                        value={formData.commonBathrooms}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚗 Parking Facility
                                    </label>
                                    <input
                                        type="text"
                                        name="parkingDetails"
                                        value={formData.parkingDetails}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 1 car + 1 bike"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🏗️ Cement Used
                                    </label>
                                    <select
                                        name="cementUsed"
                                        value={formData.cementUsed}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Cement Brand</option>
                                        <option value="Ultratech">Ultratech</option>
                                        <option value="ACC">ACC</option>
                                        <option value="Ambuja">Ambuja</option>
                                        <option value="Shree">Shree</option>
                                        <option value="Birla">Birla</option>
                                        <option value="JSW">JSW</option>
                                        <option value="Ramco">Ramco</option>
                                        <option value="Dalmia">Dalmia</option>
                                        <option value="Priya">Priya</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚪 Wood for Main Door & Pooja
                                    </label>
                                    <select
                                        name="mainDoorWood"
                                        value={formData.mainDoorWood}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Wood Type</option>
                                        <option value="1st Teak">1st Teak</option>
                                        <option value="2nd Teak">2nd Teak</option>
                                        <option value="Sagwan">Sagwan</option>
                                        <option value="Rosewood">Rosewood</option>
                                        <option value="Mahogany">Mahogany</option>
                                        <option value="Burma Teak">Burma Teak</option>
                                        <option value="Engineered Wood">Engineered Wood</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚪 Wood for Windows & Other Doors
                                    </label>
                                    <select
                                        name="windowsWood"
                                        value={formData.windowsWood}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Material</option>
                                        <option value="1st Teak">1st Teak</option>
                                        <option value="2nd Teak">2nd Teak</option>
                                        <option value="UPVC">UPVC</option>
                                        <option value="Aluminum">Aluminum</option>
                                        <option value="Sagwan">Sagwan</option>
                                        <option value="Engineered Wood">Engineered Wood</option>
                                        <option value="Fiber">Fiber</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🪟 Interiors
                                    </label>
                                    <input
                                        type="text"
                                        name="interiors"
                                        value={formData.interiors}
                                        onChange={handleInputChange}
                                        placeholder="e.g., TV unit, wardrobes, Modular Kitchen, PVC ceiling"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚿 Bathroom Fittings
                                    </label>
                                    <select
                                        name="bathroomFittings"
                                        value={formData.bathroomFittings}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Brand</option>
                                        <option value="Jaguar">Jaguar</option>
                                        <option value="Kohler">Kohler</option>
                                        <option value="Grohe">Grohe</option>
                                        <option value="Hindware">Hindware</option>
                                        <option value="Cera">Cera</option>
                                        <option value="Parryware">Parryware</option>
                                        <option value="Jaquar">Jaquar</option>
                                        <option value="Marc">Marc</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🔌 Electric Cables
                                    </label>
                                    <select
                                        name="electricCables"
                                        value={formData.electricCables}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Cable Brand</option>
                                        <option value="Vguard">Vguard</option>
                                        <option value="Havells">Havells</option>
                                        <option value="Polycab">Polycab</option>
                                        <option value="Finolex">Finolex</option>
                                        <option value="KEI">KEI</option>
                                        <option value="RR Kabel">RR Kabel</option>
                                        <option value="Anchor">Anchor</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🔘 Switches
                                    </label>
                                    <select
                                        name="switches"
                                        value={formData.switches}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Switch Brand</option>
                                        <option value="GM">GM</option>
                                        <option value="Legrand">Legrand</option>
                                        <option value="Havells">Havells</option>
                                        <option value="Anchor">Anchor</option>
                                        <option value="Schneider">Schneider</option>
                                        <option value="Philips">Philips</option>
                                        <option value="Wipro">Wipro</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚰 Sump Capacity
                                    </label>
                                    <input
                                        type="text"
                                        name="sumpCapacity"
                                        value={formData.sumpCapacity}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 10k liters"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        💧 Overhead Tank Capacity
                                    </label>
                                    <input
                                        type="text"
                                        name="overheadTankCapacity"
                                        value={formData.overheadTankCapacity}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 1k liters"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚪 Main Gate
                                    </label>
                                    <select
                                        name="mainGate"
                                        value={formData.mainGate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Gate Material</option>
                                        <option value="MS Steel">MS Steel</option>
                                        <option value="SS Steel">SS Steel</option>
                                        <option value="Iron">Iron</option>
                                        <option value="Aluminum">Aluminum</option>
                                        <option value="Wood">Wood</option>
                                        <option value="Fiber">Fiber</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🛠️ Railings
                                    </label>
                                    <select
                                        name="railings"
                                        value={formData.railings}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Railing Type</option>
                                        <option value="SS Railing">SS Railing</option>
                                        <option value="MS Railing">MS Railing</option>
                                        <option value="Iron Railing">Iron Railing</option>
                                        <option value="Aluminum Railing">Aluminum Railing</option>
                                        <option value="Glass Railing">Glass Railing</option>
                                        <option value="Wood Railing">Wood Railing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🎨 Paint Used
                                    </label>
                                    <select
                                        name="paintUsed"
                                        value={formData.paintUsed}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Paint Brand</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Berger">Berger</option>
                                        <option value="Dulux">Dulux</option>
                                        <option value="Nerolac">Nerolac</option>
                                        <option value="Jotun">Jotun</option>
                                        <option value="Shalimar">Shalimar</option>
                                        <option value="Indigo">Indigo</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🧭 Vaastu
                                    </label>
                                    <select
                                        name="vaastu"
                                        value={formData.vaastu}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select Vaastu Status</option>
                                        <option value="Pakka Vaastu">Pakka Vaastu</option>
                                        <option value="Vaastu Compliant">Vaastu Compliant</option>
                                        <option value="Partial Vaastu">Partial Vaastu</option>
                                        <option value="Non-Vaastu">Non-Vaastu</option>
                                        <option value="Vaastu Corrected">Vaastu Corrected</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Nearby Amenities Section */}
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🌟 Nearby Amenities</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🏫 Schools & Colleges
                                    </label>
                                    <input
                                        type="text"
                                        name="nearbySchools"
                                        value={formData.nearbySchools}
                                        onChange={handleInputChange}
                                        placeholder="e.g., KSS School & College"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🏥 Hospital
                                    </label>
                                    <input
                                        type="text"
                                        name="nearbyHospitals"
                                        value={formData.nearbyHospitals}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Sri Someshwara Multi-Speciality Hospital"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🚌 Public Transport
                                    </label>
                                    <input
                                        type="text"
                                        name="publicTransport"
                                        value={formData.publicTransport}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Bus & Auto"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🛒 Groceries/Dairy
                                    </label>
                                    <input
                                        type="text"
                                        name="groceries"
                                        value={formData.groceries}
                                        onChange={handleInputChange}
                                        placeholder="e.g., within 200 meters"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Services Section */}
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💼 Additional Services</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        💳 Loan Assistance
                                    </label>
                                    <textarea
                                        name="loanAssistance"
                                        value={formData.loanAssistance}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="e.g., Up to 90% funding can be provided. Hassle Free loan processing and disbursement. Assistance for Fund Management and queries related to finances"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        📋 Legal Details
                                    </label>
                                    <textarea
                                        name="legalDetails"
                                        value={formData.legalDetails}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="e.g., Clear Title Deeds and other Legal Documents. Legal Assistance will be provided for property related queries"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🏢 Company T&C
                                    </label>
                                    <textarea
                                        name="companyTerms"
                                        value={formData.companyTerms}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="e.g., Free Property Visits"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Amenities
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {amenitiesList.map((amenity) => (
                                    <label key={amenity} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => handleAmenitiesChange(amenity)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                📸 Property Images
                            </h3>

                            <div className="border-2 border-dashed border-orange-300 dark:border-orange-600 rounded-lg p-8 hover:border-orange-400 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center cursor-pointer hover:text-orange-600 transition-colors"
                                >
                                    <FiUpload className="w-16 h-16 text-orange-400 mb-4" />
                                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Click to upload images</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Support: JPG, PNG, GIF (Max 5MB each)</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        Selected: {imageFiles.length} files | Previews: {previewImages.length}
                                    </p>
                                </label>
                            </div>

                            {/* Image Previews */}
                            {previewImages.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Image Previews ({previewImages.length})
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {previewImages.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-sm"
                                                    onError={(e) => {
                                                        console.error(`Error loading preview image ${index}:`, e);
                                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjOTk5Ii8+Cjwvc3ZnPgo=';
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Remove image"
                                                >
                                                    <FiX className="w-4 h-4" />
                                                </button>
                                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                    {index + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}



                            {/* Debug Info */}
                            {(imageFiles.length > 0 || previewImages.length > 0) && (
                                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
                                    <strong>Debug Info:</strong> Files: {imageFiles.length}, Previews: {previewImages.length}
                                    {imageFiles.length > 0 && (
                                        <div>File names: {imageFiles.map(f => f.name).join(', ')}</div>
                                    )}
                                </div>
                            )}
                        </div>



                        {/* Featured Toggle */}
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleInputChange}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mark as Featured Property
                            </label>
                        </div>

                        {/* Upload Progress */}
                        {loading && (uploadProgress > 0 || uploadStatus) && (
                            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        {uploadStatus || "Processing..."}
                                    </span>
                                    <span className="text-sm text-blue-600 dark:text-blue-400">
                                        {uploadProgress}%
                                    </span>
                                </div>
                                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 flex items-center space-x-2 min-w-[140px] justify-center"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>
                                            {uploadStatus ? "Uploading..." : "Saving..."}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="w-4 h-4" />
                                        <span>Save Property</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default PropertyForm;