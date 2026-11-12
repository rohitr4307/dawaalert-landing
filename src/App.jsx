import { useState } from "react";
import { Bell, IndianRupee, Camera, MessageCircle } from "lucide-react";
import { supabase } from "./supabase";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        pharmacy_name: "",
        owner_name: "",
        mobile_number: "",
        whatsapp_number: "",
        city: "",
        software_used: "",
        expiry_loss_bucket: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogoClick = () => {
        setSubmitted(false);
        setErrorMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const { data, error } = await supabase
                .from("waitlist")
                .insert([formData])
                .select();

            console.log("DATA:", data);
            console.log("ERROR:", error);

            if (error) {

                if (error.code === "23505") {
                    setErrorMessage(
                        "This pharmacy is already registered for early access."
                    );
                    return;
                }

                setErrorMessage(error.message);
                return;
            }

            setErrorMessage("");
            setSubmitted(true);

            setFormData({
                pharmacy_name: "",
                owner_name: "",
                mobile_number: "",
                whatsapp_number: "",
                city: "",
                software_used: "",
                expiry_loss_bucket: ""
            });

        } catch (err) {
            console.log("CATCH ERROR:", err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">

            {/* NAVBAR */}

            <nav className="border-b">
                <div className="max-w-7xl mx-auto p-5 flex justify-between">
                    <button
                        onClick={handleLogoClick}
                        className="text-2xl font-bold cursor-pointer"
                    >
                        Dawa<span className="text-green-600">Alert</span>
                    </button>

                    <a
                        href="#waitlist"
                        className="bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        Join Waitlist
                    </a>
                </div>
            </nav>

            {/* HERO */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    <div>

                        <div className="inline-flex bg-red-50 text-red-600 px-4 py-2 rounded-full mb-6">
                            Stop losing money on expired medicines
                        </div>

                        <h1 className="text-5xl font-bold leading-tight">
                            Recover ₹15,000–₹50,000 Every Year From Missed Expiry Returns
                        </h1>

                        <p className="text-xl text-gray-600 mt-6">
                            Track expiry dates, distributor return deadlines and recover credit notes before valuable inventory becomes a loss.
                        </p>

                        <div className="flex gap-6 mt-8">

                            <div>
                                <p className="text-3xl font-bold">
                                    ₹15k+
                                </p>
                                <p className="text-gray-500">
                                    annual recovery potential
                                </p>
                            </div>

                            <div>
                                <p className="text-3xl font-bold">
                                    0
                                </p>
                                <p className="text-gray-500">
                                    spreadsheets required
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="bg-green-50 rounded-3xl p-8">

                        <div className="bg-white rounded-2xl p-6 shadow">

                            <div className="flex items-center gap-2 mb-5">
                                <MessageCircle size={20} />
                                <h3 className="font-bold">
                                    WhatsApp Alert
                                </h3>
                            </div>

                            <div className="bg-green-100 p-5 rounded-xl">

                                <p className="font-semibold">
                                    Balaji Pharma return window closes in 4 days.
                                </p>

                                <p className="mt-3">
                                    Recover ₹3,240 by returning:
                                </p>

                                <ul className="mt-3 space-y-2">
                                    <li>• Augmentin 625 - 4 strips</li>
                                    <li>• Glycomet 500 - 2 strips</li>
                                    <li>• Azee 500 - 1 box</li>
                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* FEATURES */}

            <section className="bg-gray-50 py-20">

                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-center text-4xl font-bold mb-12">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-white p-6 rounded-xl">
                            <Camera className="mb-4 text-green-600" />
                            <h3 className="font-bold text-xl">
                                Capture Invoice
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Take a photo of a distributor invoice.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl">
                            <Bell className="mb-4 text-green-600" />
                            <h3 className="font-bold text-xl">
                                AI Tracks Expiry
                            </h3>
                            <p className="mt-2 text-gray-600">
                                We identify batches and expiry dates automatically.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl">
                            <IndianRupee className="mb-4 text-green-600" />
                            <h3 className="font-bold text-xl">
                                Recover Revenue
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Get reminders before distributor return deadlines.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* WAITLIST */}

            <section
                id="waitlist"
                className="py-20"
            >
                <div className="max-w-3xl mx-auto px-6">

                    <div className="bg-white border rounded-3xl p-8 shadow">

                        <h2 className="text-3xl font-bold text-center">
                            Become a Founding Pharmacy
                        </h2>

                        <p className="text-center text-red-600 font-medium mt-2">
                            Currently onboarding only 25 pharmacies for beta access
                        </p>

                        <p className="text-center text-gray-600 mt-3">
                            Help us build DawaAlert for pharmacies.
                        </p>

                        {submitted && (
                            <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg mt-6 mb-6">
                                ✅ Thank you for registering.
                                <br />
                                We will contact you shortly regarding early access.
                            </div>
                        )}

                        {errorMessage && (
                            <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl mt-6 mb-6">
                                ⚠️ {errorMessage}
                            </div>
                        )}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 mt-8"
                        >

                            <input
                                name="pharmacy_name"
                                placeholder="Pharmacy Name"
                                className="w-full border p-3 rounded-lg"
                                required
                                value={formData.pharmacy_name}
                                onChange={handleChange}
                            />

                            <input
                                name="owner_name"
                                placeholder="Owner Name"
                                className="w-full border p-3 rounded-lg"
                                required
                                value={formData.owner_name}
                                onChange={handleChange}
                            />

                            <input
                                name="mobile_number"
                                placeholder="Mobile Number"
                                className="w-full border p-3 rounded-lg"
                                required
                                value={formData.mobile_number}
                                onChange={handleChange}
                            />

                            <input
                                name="whatsapp_number"
                                placeholder="WhatsApp Number"
                                className="w-full border p-3 rounded-lg"
                                required
                                value={formData.whatsapp_number}
                                onChange={handleChange}
                            />

                            <input
                                name="city"
                                placeholder="City"
                                className="w-full border p-3 rounded-lg"
                                value={formData.city}
                                onChange={handleChange}
                            />

                            <select
                                name="software_used"
                                className="w-full border p-3 rounded-lg"
                                onChange={handleChange}
                                value={formData.software_used}
                            >
                                <option value="">Current Software</option>
                                <option>Marg ERP</option>
                                <option>BUSY</option>
                                <option>RetailGraph</option>
                                <option>eVitalRx</option>
                                <option>Other</option>
                            </select>

                            <select
                                name="expiry_loss_bucket"
                                className="w-full border p-3 rounded-lg"
                                onChange={handleChange}
                                value={formData.expiry_loss_bucket}
                            >
                                <option value="">Annual Expiry Loss</option>
                                <option>Less than ₹10k</option>
                                <option>₹10k - ₹25k</option>
                                <option>₹25k - ₹50k</option>
                                <option>More than ₹50k</option>
                            </select>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold"
                            >
                                {loading ? "Submitting..." : "Join Early Access"}
                            </button>

                        </form>

                    </div>

                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto text-center px-6">

                    <h3 className="text-2xl font-bold">
                        Built for Indian Pharmacies
                    </h3>

                    <p className="mt-4 text-gray-600">
                        DawaAlert is being built to help pharmacy owners reduce
                        losses caused by missed expiry returns and distributor
                        claim deadlines.
                    </p>

                </div>
            </section>

        </div>
    );
}