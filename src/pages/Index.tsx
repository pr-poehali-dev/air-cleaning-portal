import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Заявка принята!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения записи.",
    });
    setIsBookingOpen(false);
  };

  const services = [
    {
      icon: 'Wind',
      title: 'Базовая чистка',
      description: 'Очистка фильтров и внешнего блока',
      price: 'от 2 500 ₽'
    },
    {
      icon: 'Droplets',
      title: 'Глубокая чистка',
      description: 'Полная разборка и дезинфекция системы',
      price: 'от 4 500 ₽'
    },
    {
      icon: 'ShieldCheck',
      title: 'Профилактика',
      description: 'Диагностика и устранение неполадок',
      price: 'от 3 000 ₽'
    },
    {
      icon: 'Wrench',
      title: 'Ремонт',
      description: 'Замена деталей и устранение поломок',
      price: 'от 5 000 ₽'
    }
  ];

  const faqs = [
    {
      question: 'Как часто нужно чистить кондиционер?',
      answer: 'Рекомендуется проводить профилактическую чистку минимум 2 раза в год — перед летним и зимним сезоном. При активном использовании лучше чистить раз в 3-4 месяца.'
    },
    {
      question: 'Сколько времени занимает чистка?',
      answer: 'Базовая чистка занимает 1-1.5 часа. Глубокая чистка с полной разборкой может занять до 2-3 часов в зависимости от состояния кондиционера.'
    },
    {
      question: 'Что входит в услугу чистки?',
      answer: 'В базовую услугу входит: очистка фильтров, промывка теплообменника, чистка дренажной системы, дезинфекция внутреннего блока, проверка работоспособности.'
    },
    {
      question: 'Выезжаете ли вы за пределы города?',
      answer: 'Да, мы работаем в городе и ближайших пригородах. Стоимость выезда за город обсуждается индивидуально.'
    },
    {
      question: 'Даете ли вы гарантию?',
      answer: 'На все виды работ предоставляется гарантия 6 месяцев. На замененные детали действует гарантия производителя.'
    }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Wind" size={32} className="text-primary" />
            <span className="font-heading text-2xl font-bold text-primary">ЧистыйВоздух</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#prices" className="hover:text-primary transition-colors">Цены</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="hidden md:flex">
                <Icon name="Calendar" size={20} className="mr-2" />
                Записаться
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Онлайн-запись</DialogTitle>
                <DialogDescription>
                  Выберите удобную дату и время для визита мастера
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" placeholder="Ваше имя" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                    </div>
                    <div>
                      <Label htmlFor="service">Услуга</Label>
                      <Select required>
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service, idx) => (
                            <SelectItem key={idx} value={service.title}>
                              {service.title} — {service.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="time">Время</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime} required>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Дата</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Подтвердить запись
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Профессиональная чистка кондиционеров
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Продлите срок службы вашего кондиционера и дышите чистым воздухом. 
                Быстро, качественно, с гарантией.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg">
                      <Icon name="Calendar" size={24} className="mr-2" />
                      Записаться онлайн
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button size="lg" variant="outline" className="text-lg">
                  <Icon name="Phone" size={24} className="mr-2" />
                  +7 (999) 123-45-67
                </Button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2000+</div>
                  <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5 лет</div>
                  <div className="text-sm text-muted-foreground">На рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Гарантия качества</div>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/3ef059e7-a3e5-49f3-8f0d-f3bffb9d6692/files/6720b19a-36a3-424b-a03a-7af771b80af3.jpg" 
                alt="Чистка кондиционера" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">Полный спектр работ по обслуживанию кондиционеров</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Цены</h2>
            <p className="text-xl text-muted-foreground">Прозрачные цены без скрытых платежей</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Базовый</CardTitle>
                <CardDescription>Для домашнего использования</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold">2 500 ₽</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Чистка фильтров</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Промывка теплообменника</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Проверка работы</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Выбрать</Button>
              </CardContent>
            </Card>

            <Card className="border-4 border-primary shadow-xl scale-105">
              <CardHeader>
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm w-fit mb-2">
                  Популярный
                </div>
                <CardTitle className="text-2xl">Стандарт</CardTitle>
                <CardDescription>Оптимальный выбор</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold">4 500 ₽</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Всё из базового</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Глубокая чистка</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Дезинфекция</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Заправка фреоном</span>
                  </li>
                </ul>
                <Button className="w-full">Выбрать</Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Премиум</CardTitle>
                <CardDescription>Максимальный уход</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold">6 500 ₽</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Всё из стандарта</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Чистка внешнего блока</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Диагностика электроники</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Гарантия 12 месяцев</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Выбрать</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-xl text-muted-foreground">Ответы на популярные вопросы наших клиентов</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={28} className="mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Телефон</div>
                    <a href="tel:+79991234567" className="text-xl hover:underline">+7 (999) 123-45-67</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={28} className="mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Email</div>
                    <a href="mailto:info@cleanair.ru" className="text-xl hover:underline">info@cleanair.ru</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={28} className="mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Адрес</div>
                    <div className="text-xl">г. Москва, ул. Примерная, д. 123</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={28} className="mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Режим работы</div>
                    <div className="text-xl">Пн-Вс: 9:00 — 21:00</div>
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Быстрая заявка</CardTitle>
                <CardDescription>Оставьте контакты, мы перезвоним в течение 15 минут</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="quick-name">Имя</Label>
                    <Input id="quick-name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label htmlFor="quick-phone">Телефон</Label>
                    <Input id="quick-phone" type="tel" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Wind" size={28} className="text-primary" />
            <span className="font-heading text-xl font-bold">ЧистыйВоздух</span>
          </div>
          <p className="text-gray-400">© 2025 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
