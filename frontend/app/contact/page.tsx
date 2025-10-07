import ContactForm from '../components/ContactForm';
import Navigation from '../components/Navigation';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation currentPage="contact" />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* lowercase intentional */}
          <h1 className="text-5xl font-light tracking-wider mb-8 text-center">contact</h1>
          <p className="text-center text-gray-300 mb-16">
            문의사항이나 협업 제안을 보내주세요
          </p>
          
          <ContactForm />
        </div>
      </div>
    </main>
  );
}