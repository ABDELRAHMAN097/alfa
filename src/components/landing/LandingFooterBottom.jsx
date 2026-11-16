
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaPinterestP } from "react-icons/fa";

export default function LandingFooterBottom() {
    return (
        <div className="w-full bg-[#E0E0E0] px-5 py-5 sm:px-8">
            <div
                className="mx-auto flex max-w-[1030px] flex-col items-center justify-between gap-4 sm:flex-row">
                {/* Copyright */}
                <p className="text-[11px] text-[#999999]">
                    Alfa Care © {new Date().getFullYear()}.{" "}
                    <a
                        href="#privacy"
                        className="underline transition hover:text-gray-600"
                    >
                        Privacy Policy
                    </a>
                </p>

                {/* Social Media */}
                <div className="flex items-center gap-4">
                    <span className="text-[11px] text-[#999999]">
                        Follow Us
                    </span>

                    <a href="#facebook" aria-label="Facebook" className="text-[#777777] hover:text-[#85A52C]">
                        <FaFacebookF size={11} />
                    </a>

                    <a href="#twitter" aria-label="Twitter" className="text-[#777777] hover:text-[#85A52C]">
                        <FaTwitter size={11} />
                    </a>

                    <a href="#google" aria-label="Google Plus" className="text-[#777777] hover:text-[#85A52C]">
                        <FaGooglePlusG size={13} />
                    </a>

                    <a href="#pinterest" aria-label="Pinterest" className="text-[#777777] hover:text-[#85A52C]">
                        <FaPinterestP size={11} />
                    </a>
                </div>
            </div>
        </div>
    );
}
