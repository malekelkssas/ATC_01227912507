import { useTranslation } from "react-i18next";
import { TranslationConstants } from "@/utils/constants";

const Success = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <img 
                    src="/success.png" 
                    alt="Success" 
                    className="w-100 h-64 mx-auto animate-float"
                />
                <h1 className="text-5xl font-bold text-primary">{t(TranslationConstants.COMMON.MESSAGES.SUCCESS)}</h1>
                <p className="text-xl text-muted-foreground">{t(TranslationConstants.COMMON.MESSAGES.SUCCESS_DESCRIPTION)}</p>
                <a 
                    href="/" 
                    className="duck-button inline-block"
                >
                    Go back home
                </a>
            </div>
        </div>
    );
}

export default Success; 