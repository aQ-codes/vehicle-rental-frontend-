"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CAR_FORM_INPUTS } from "@/constants/index";
import { VehicleModel } from "@/models/index";
import { useAddVehicleModel } from "../services/VehicleModelService"; 

export default function CarForm() {
    const { addVehicleModel, loading, error } = useAddVehicleModel(); // Get error from useAddVehicleModel

    const [formData, setFormData] = useState<VehicleModel>({
        name: "",
        model: "",
        make: "",
        type: "",
        seats: 0,
        doors: 0,
        description: "",
        primaryImage: null,
        additionalImages: [],
    });

    const [primaryImage, setPrimaryImage] = useState<File | null>(null);
    const [additionalImages, setAdditionalImages] = useState<File[]>([]);

    // State to store error messages for image validation
    const [primaryImageError, setPrimaryImageError] = useState<string | null>(null);
    const [additionalImagesError, setAdditionalImagesError] = useState<string | null>(null);
    
    // State for success message
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Allowed image file types
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"];

    // Handle text, number, and select inputs
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle primary image upload with validation
    const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (allowedImageTypes.includes(file.type)) {
                setPrimaryImageError(null); // Clear any previous errors
                setPrimaryImage(file);
                setFormData((prev) => ({
                    ...prev,
                    primaryImage: file, // Update formData with the selected image
                }));
            } else {
                setPrimaryImageError("Please upload a valid image file (JPEG, PNG, GIF, WebP, Avif).");
                setPrimaryImage(null);
                setFormData((prev) => ({
                    ...prev,
                    primaryImage: null,
                }));
            }
        }
    };

    // Handle additional images upload with validation
    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(file => allowedImageTypes.includes(file.type));

        if (validFiles.length !== files.length) {
            setAdditionalImagesError("Some files were not valid images. Please upload JPEG, PNG, GIF, or WebP files.");
            setAdditionalImages(validFiles);
            setFormData((prev) => ({
                ...prev,
                additionalImages: validFiles,
            }));
        } else {
            setAdditionalImagesError(null); // Clear any previous errors
            setAdditionalImages(validFiles);
            setFormData((prev) => ({
                ...prev,
                additionalImages: validFiles,
            }));
        }
    };

    // Handle submit 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await addVehicleModel({ 
                name: formData.name,
                model: formData.model,
                make: formData.make,
                type: formData.type,
                seats: parseInt(formData.seats as unknown as string), // Convert to integer
                doors: parseInt(formData.doors as unknown as string), // Convert to integer
                description: formData.description,
                primaryImage: formData.primaryImage,
                additionalImages: formData.additionalImages
            });

            setSuccessMessage("Vehicle model added successfully!"); // Set the success message
            setFormData({ // Optionally, reset the form
                name: "",
                model: "",
                make: "",
                type: "",
                seats: 0,
                doors: 0,
                description: "",
                primaryImage: null,
                additionalImages: [],
            });
            setPrimaryImage(null); // Reset primary image
            setAdditionalImages([]); // Reset additional images
        } catch (error) {
            // Handle error from mutation
            console.error('Error creating vehicle:', error);
        }
    };

    // Show the success message or the form
    if (successMessage) {
        return <div className="text-green-600 text-lg flex justify-center items-center">{successMessage}</div>;
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                {CAR_FORM_INPUTS.map((input) => {
                    if (input.fieldType === "text" || input.fieldType === "number") {
                        return (
                            <div key={input.name} className="flex flex-col text-sm">
                                <label className="mb-1" htmlFor={input.name}>
                                    {input.label}
                                </label>
                                <input
                                    id={input.name}
                                    type={input.fieldType}
                                    required={input.required}
                                    name={input.name}
                                    placeholder={`Enter ${input.label}`}
                                    className="border rounded-md p-2"
                                    onChange={handleInputChange}
                                />
                            </div>
                        );
                    }
                    if (input.fieldType === "dropdown" && input.options) {
                        return (
                            <div key={input.name} className="flex flex-col text-sm">
                                <label className="mb-1" htmlFor={input.name}>
                                    {input.label}
                                </label>
                                <select
                                    id={input.name}
                                    name={input.name}
                                    required={input.required}
                                    className="border rounded-md p-2 bg-white"
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>
                                        Select {input.label}
                                    </option>
                                    {input.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Description Section */}
            <div className={`flex flex-col text-sm w-full`}>
                <label className="mb-1" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    placeholder="Enter car description"
                    rows={5}
                    className="border rounded-md p-2 w-full"
                    onChange={handleInputChange}
                />
            </div>

            {/* Primary Image Upload */}
            <div className="space-y-2 text-sm">
                <label className="mb-1" htmlFor="primaryImage">
                    Upload Primary Image
                </label>
                <input
                    id="primaryImage"
                    type="file"
                    onChange={handlePrimaryImageChange}
                    className="border rounded-md p-2 w-full"
                    accept="image/*" // Restrict file picker to images
                />
                {/* Display an error if primary image is invalid */}
                {primaryImageError && (
                    <p className="text-red-500 text-xs">{primaryImageError}</p>
                )}
            </div>

            {primaryImage && (
                <div className="mt-4">
                    <h4>Primary Image Preview:</h4>
                    <Image
                        src={URL.createObjectURL(primaryImage)}
                        alt="Primary"
                        className="w-16 h-16 object-cover border border-gray-300 rounded"
                        width={100}
                        height={100}
                    />
                </div>
            )}

            {/* Additional Images Upload */}
            <div className="space-y-2 text-sm">
                <label className="mb-1" htmlFor="images">
                    Upload Additional Images (Up to 5)
                </label>
                <input
                    id="images"
                    type="file"
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className="border rounded-md p-2 w-full"
                    accept="image/*" // Restrict file picker to images
                />
                {/* Display an error if additional images are invalid */}
                {additionalImagesError && (
                    <p className="text-red-500 text-xs">{additionalImagesError}</p>
                )}
            </div>

            {additionalImages.length > 0 && (
                <div className="mt-4">
                    <h4>Additional Images Preview:</h4>
                    <div className="flex space-x-2">
                        {additionalImages.map((img, index) => (
                            <Image
                                key={index}
                                src={URL.createObjectURL(img)}
                                alt={`Additional ${index + 1}`}
                                className="w-16 h-16 object-cover border border-gray-300 rounded"
                                width={100}
                                height={100}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                className={`bg-blue-600 text-white px-4 py-2 rounded-md ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Vehicle Model"}
            </button>

            {/* Display error message if mutation fails */}
            {error && (
                <p className="text-red-500 text-sm">{error.message}</p>
            )}
        </form>
    );
}
