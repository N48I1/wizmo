import { Link } from "wouter";
import { BigButton } from "@/components/BigButton";
import { WizmoCharacter } from "@/components/WizmoCharacter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <WizmoCharacter mood="thinking" size="lg" className="mb-8" />
      
      <div className="bg-white rounded-[2rem] p-12 shadow-xl border-4 border-gray-100 max-w-lg w-full">
        <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
        
        <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">404 Page Not Found</h1>
        <p className="text-gray-500 text-lg mb-8 font-medium">
          Uh oh! Wizmo can't find this page. It might have disappeared with a magic spell!
        </p>
        
        <Link href="/">
          <BigButton variant="primary" className="w-full">
            Take Me Home
          </BigButton>
        </Link>
      </div>
    </div>
  );
}
