import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

const PRIMARY = '#0d9488';
const DARK = '#111118';
const GRAY = '#71717a';
const WHITE = '#ffffff';

function addPage(doc: PDFKit.PDFDocument, title: string) {
  doc.addPage();
  // Header bar
  doc.rect(0, 0, doc.page.width, 60).fill(DARK);
  doc.fontSize(14).fillColor(PRIMARY).text('ZYPHON SYSTEMS', 40, 22, { align: 'left' });
  doc.fontSize(10).fillColor(WHITE).text(title, 0, 24, { align: 'right', width: doc.page.width - 40 });
  doc.moveDown(3);
  doc.fillColor(DARK);
}

function sectionTitle(doc: PDFKit.PDFDocument, text: string) {
  doc.fontSize(18).fillColor(PRIMARY).text(text, 40);
  doc.moveDown(0.5);
  doc.strokeColor(PRIMARY).lineWidth(1).moveTo(40, doc.y).lineTo(200, doc.y).stroke();
  doc.moveDown(0.8);
  doc.fillColor(DARK);
}

function bodyText(doc: PDFKit.PDFDocument, text: string) {
  doc.fontSize(10).fillColor(GRAY).text(text, 40, undefined, { width: doc.page.width - 80, lineGap: 4 });
  doc.moveDown(0.5);
}

function bulletList(doc: PDFKit.PDFDocument, items: string[]) {
  items.forEach((item) => {
    doc.fontSize(10).fillColor(GRAY).text(`  •  ${item}`, 50, undefined, { width: doc.page.width - 100, lineGap: 3 });
  });
  doc.moveDown(0.5);
}

async function generate() {
  const outDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const stream = fs.createWriteStream(path.join(outDir, 'zyphon-profile.pdf'));
  doc.pipe(stream);

  // ===== PAGE 1: Cover =====
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
  // Logo area
  doc.fontSize(48).fillColor(PRIMARY).text('ZYPHON', 0, 200, { align: 'center' });
  doc.fontSize(16).fillColor(WHITE).text('SYSTEMS', 0, 255, { align: 'center', characterSpacing: 8 });
  doc.moveDown(3);
  doc.fontSize(14).fillColor(GRAY).text('Company Profile', 0, 320, { align: 'center' });
  doc.fontSize(10).fillColor(GRAY).text('Product Engineering for Modern Businesses', 0, 350, { align: 'center' });
  doc.fontSize(9).fillColor(GRAY).text(`Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, 0, 700, { align: 'center' });

  // ===== PAGE 2: About Us =====
  addPage(doc, 'About Us');
  sectionTitle(doc, 'Who We Are');
  bodyText(doc, 'Zyphon Systems is a product engineering company that designs, builds, and ships software products for modern businesses. We partner with founders, operators, and teams who need reliable, well-crafted technology — delivered with clarity and precision.');
  doc.moveDown(0.5);
  sectionTitle(doc, 'Our Mission');
  bodyText(doc, 'To make professional product engineering accessible to businesses of all sizes. We believe good software should be well-built, delivered on time, and maintainable for years — not just at launch.');
  doc.moveDown(0.5);
  sectionTitle(doc, 'Why Zyphon');
  bulletList(doc, [
    'End-to-end product engineering — from concept to deployment and beyond',
    'Technical depth across mobile, web, cloud and backend systems',
    'Transparent process with clear milestones and regular communication',
    'Focus on long-term quality, not just delivery speed',
    'Scalable solutions that grow with your business',
  ]);

  // ===== PAGE 3: Services =====
  addPage(doc, 'Services');
  sectionTitle(doc, 'What We Build');

  const services = [
    { name: 'Mobile App Development', desc: 'Cross-platform and native iOS/Android apps with polished UX, push notifications, offline support, and app store deployment.' },
    { name: 'Admin Panel Development', desc: 'Custom dashboards and back-office tools that centralise operations, automate workflows, and surface real-time data.' },
    { name: 'Backend Development', desc: 'Robust APIs, database architecture, authentication, integrations, and cloud infrastructure built for performance and scale.' },
    { name: 'Full Platform Development', desc: 'Complete digital ecosystems — mobile apps, admin systems, and backend services working seamlessly together.' },
    { name: 'Product Discovery', desc: 'Technical scoping, architecture planning, cost estimation, and roadmap creation to set your project up for success.' },
  ];

  services.forEach((s) => {
    doc.fontSize(12).fillColor(DARK).text(s.name, 40, undefined, { continued: false });
    doc.fontSize(10).fillColor(GRAY).text(s.desc, 50, undefined, { width: doc.page.width - 100, lineGap: 3 });
    doc.moveDown(0.7);
  });

  // ===== PAGE 4: Process =====
  addPage(doc, 'Our Process');
  sectionTitle(doc, 'How We Work');

  const steps = [
    { num: '01', title: 'Discovery & Scoping', desc: 'We learn your business, define the problem, and map out the technical approach.' },
    { num: '02', title: 'Architecture & Planning', desc: 'We design the system architecture, choose the right tech stack, and create a detailed project plan.' },
    { num: '03', title: 'Design & Prototyping', desc: 'We create UI/UX designs and interactive prototypes for validation before development begins.' },
    { num: '04', title: 'Development & Testing', desc: 'We build in iterative sprints with continuous testing, code reviews, and regular demos.' },
    { num: '05', title: 'Deployment & Launch', desc: 'We deploy to production, configure monitoring, and ensure a smooth go-live.' },
    { num: '06', title: 'Support & Growth', desc: 'Post-launch support, performance monitoring, and iterative improvements as your product grows.' },
  ];

  steps.forEach((s) => {
    doc.fontSize(11).fillColor(PRIMARY).text(s.num, 40, undefined, { continued: true });
    doc.fillColor(DARK).text(`  ${s.title}`);
    doc.fontSize(10).fillColor(GRAY).text(s.desc, 70, undefined, { width: doc.page.width - 120, lineGap: 3 });
    doc.moveDown(0.6);
  });

  // ===== PAGE 5: Contact =====
  addPage(doc, 'Contact');
  sectionTitle(doc, 'Get In Touch');
  bodyText(doc, 'Ready to discuss your project? We would love to hear from you.');
  doc.moveDown(1);

  const contacts = [
    { label: 'Email', value: 'hello@zyphon.systems' },
    { label: 'Website', value: 'https://zyphon.systems' },
    { label: 'LinkedIn', value: 'linkedin.com/company/zyphon' },
    { label: 'GitHub', value: 'github.com/zyphon' },
  ];

  contacts.forEach((c) => {
    doc.fontSize(11).fillColor(DARK).text(c.label, 40, undefined, { continued: true });
    doc.fillColor(PRIMARY).text(`   ${c.value}`);
    doc.moveDown(0.4);
  });

  doc.moveDown(3);
  doc.fontSize(10).fillColor(GRAY).text('© Zyphon Systems. All rights reserved.', 0, undefined, { align: 'center', width: doc.page.width });

  doc.end();
  await new Promise<void>((resolve) => stream.on('finish', resolve));
  console.log('✓ Company profile PDF generated: public/zyphon-profile.pdf');
}

generate().catch(console.error);
