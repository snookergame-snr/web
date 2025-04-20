import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

export default function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center text-sm font-medium text-gray-300 hover:text-white bg-neutral-medium/80 hover:bg-neutral-medium border-neutral-medium/50"
        >
          <span className="mr-1">{language.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent ref={dropdownRef} className="bg-neutral-dark border-neutral-medium/50 w-24">
        <DropdownMenuItem 
          className={`${language === 'th' ? 'text-white font-medium' : 'text-gray-300'} hover:bg-neutral-medium`}
          onClick={() => changeLanguage('th')}
        >
          {t('language.th')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`${language === 'en' ? 'text-white font-medium' : 'text-gray-300'} hover:bg-neutral-medium`}
          onClick={() => changeLanguage('en')}
        >
          {t('language.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
