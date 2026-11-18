import seed from './seed.json' with {type:'json'};
import registry from './templates.json' with {type:'json'};

const arrow = '<span aria-hidden="true">↗</span>';
const heading = '<h1 data-cms-text="title"></h1>';
const photo = '<img class="wi-feature-photo" data-cms-image="image" data-cms-alt="alt" decoding="async" fetchpriority="high">';
const action = `<a class="button wi-button" data-cms-text="button" data-cms-url="buttonUrl">${arrow}</a>`;
const titleField = {title:'페이지 제목'};
const imageFields = {image:'대표 사진',alt:'사진 설명'};
const actionFields = {button:'버튼 문구',buttonUrl:'버튼 연결 주소'};

// Keep Netlify's form name, anti-spam field, inputs, accessible status and POST contract together.
const contactPanel = registry.templates['contact-1'].html;
const enquiryForm = contactPanel.slice(contactPanel.indexOf('<form '), contactPanel.indexOf('</form>') + '</form>'.length);

function template(label, html, labels) {
  const fields = Object.entries(labels).map(([key, fieldLabel]) => {
    let kind = 'text';
    if (key === 'image' || key === 'alt') kind = key;
    if (key.endsWith('Url')) kind = 'url';
    return {key, kind, label:fieldLabel};
  });
  return {label, html, fields};
}

export const interiorTemplates = {
  'services-feature': template('서비스와 설치 안내', `
    <section class="wrap wi-feature wi-services">
      <div class="wi-feature-copy">
        ${heading}
        <dl class="wi-services-list">
          <div><dt data-cms-text="measure"></dt><dd data-cms-text="measureBody"></dd></div>
          <div><dt data-cms-text="make"></dt><dd data-cms-text="makeBody"></dd></div>
          <div><dt data-cms-text="install"></dt><dd data-cms-text="installBody"></dd></div>
        </dl>
        ${action}
      </div>
      <figure>${photo}</figure>
    </section>`,
    {...titleField,measure:'실측 안내 제목',measureBody:'실측 안내',make:'제작 안내 제목',
      makeBody:'제작 안내',install:'설치 안내 제목',installBody:'설치 기간과 보증 안내',...imageFields,...actionFields}),

  'about-feature': template('회사 소개와 사진', `
    <section class="wrap wi-feature wi-about">
      <figure>${photo}</figure>
      <div class="wi-feature-copy">
        ${heading}
        <p class="wi-about-body" data-cms-text="body"></p>
        ${action}
      </div>
    </section>`, {...titleField,body:'회사 소개',...imageFields,...actionFields}),

  'contact-office': template('고객 문의 양식과 매장 정보', `
    <div class="wrap wi-contact">
      <div class="wi-contact-direct">
        ${heading}
        <a class="wi-phone contact-phone" data-cms-text="phone" data-cms-url="phoneUrl"></a>
        <a class="wi-email contact-email" data-cms-text="email" data-cms-url="emailUrl"></a>
        <a class="wi-showroom-jump text-link" href="contact.html#showroom">Address &amp; hours ${arrow}</a>
      </div>
      <section class="wi-enquiry enquiry-panel" aria-labelledby="quote-heading">
        <h2 id="quote-heading" data-cms-text="formTitle"></h2>
        ${enquiryForm}
      </section>
      <section id="showroom" class="wi-showroom">
        <h2 data-cms-text="showroomTitle"></h2>
        <p class="wi-address" data-cms-text="address"></p>
        <a class="text-link" data-cms-text="directions" data-cms-url="directionsUrl">${arrow}</a>
        <h3 data-cms-text="hoursTitle"></h3>
        <dl class="wi-hours">
          <div><dt data-cms-text="weekdays"></dt><dd data-cms-text="weekdayHours"></dd></div>
          <div><dt data-cms-text="saturday"></dt><dd data-cms-text="saturdayHours"></dd></div>
          <div><dt data-cms-text="sunday"></dt><dd data-cms-text="sundayHours"></dd></div>
        </dl>
        <p class="wi-calgary">Calgary enquiries <a data-cms-text="calgary" data-cms-url="calgaryUrl"></a></p>
      </section>
    </div>`, {...titleField,phone:'대표 전화',phoneUrl:'전화 연결',email:'문의 이메일',emailUrl:'이메일 연결',
      formTitle:'문의 양식 제목',showroomTitle:'매장 안내 제목',address:'쇼룸 주소',directions:'길찾기 문구',
      directionsUrl:'지도 주소',hoursTitle:'영업시간 제목',weekdays:'평일 표기',weekdayHours:'평일 영업시간',
      saturday:'토요일 표기',saturdayHours:'토요일 영업시간',sunday:'일요일 표기',sundayHours:'일요일 영업시간',
      calgary:'캘거리 문의 전화',calgaryUrl:'캘거리 전화 연결'})
};

const layouts = {
  services: {
    template:'services-feature',
    values(read) {
      return {
        title:read('services-0','f1','Our services'),
        measure:read('services-1','f1','Free on-site measurement'),
        measureBody:read('services-1','f2','We measure your windows and prepare a free estimate.'),
        make:read('services-1','f4','Custom production'),
        makeBody:read('services-1','f5','Your shades are made and assembled in our Edmonton workshop.'),
        install:read('services-1','f7','Installation & warranty'),
        installBody:read('services-1','f8','Installation within 7 business days of placing your order. 5-year warranty.'),
        image:'assets/images/website/gallery-05.webp', alt:'Custom dual shades fitted to adjoining windows in a seating area',
        button:read('services-4','f3','Book a free measurement'),
        buttonUrl:read('services-4','f4','contact.html?product=Measurement%20consultation')
      };
    }
  },
  about: {
    template:'about-feature',
    values(read) {
      return {
        title:read('about-0','f1','About Winco'),
        body:read('about-1','f3','We make and assemble custom blinds and shades in Edmonton. Visit our showroom to see the fabrics in person and find the right fit for your home or business.'),
        image:read('about-1','f6'), alt:read('about-1','f7'),
        button:read('about-1','f5','Visit our showroom'), buttonUrl:read('about-1','f8')
      };
    }
  },
  contact: {
    template:'contact-office',
    values(read) {
      const direct = 'contact-1', showroom = 'contact-2';
      return {
        title:read('contact-0','f1','Contact'),
        phone:read(direct,'f1'), phoneUrl:read(direct,'f8'), email:read(direct,'f2'), emailUrl:read(direct,'f9'),
        formTitle:read(direct,'f5','Request a free quote'),
        showroomTitle:read(showroom,'f1','Edmonton showroom'), address:read(showroom,'f2'),
        directions:read(showroom,'f3'), directionsUrl:read(showroom,'f13'), hoursTitle:read(showroom,'f4','Hours'),
        weekdays:read(showroom,'f5'), weekdayHours:read(showroom,'f6'), saturday:read(showroom,'f7'),
        saturdayHours:read(showroom,'f8'), sunday:read(showroom,'f9'), sundayHours:read(showroom,'f10'),
        calgary:read(showroom,'f12'), calgaryUrl:read(showroom,'f14')
      };
    }
  }
};

// Older publications and drafts use numbered blocks. Carry custom values into matching
// fields. Keep the original layout if it holds office edits that have no new equivalent.
export function upgradeInteriors(data) {
  for (const page of data.pages) {
    if (!Object.hasOwn(layouts, page.slug)) continue;
    const layout = layouts[page.slug];
    const original = seed.pages.find(p=>p.slug === page.slug).blocks;
    const previous = new Map(original.map(b=>[b.id,b]));
    const matched = page.blocks.filter(b=>previous.has(b.id) && b.template === previous.get(b.id).template);
    if (matched.length !== original.length || matched.some(b=>b.hidden)) continue;
    const authored = new Map();
    for (const block of matched) {
      const defaults = previous.get(block.id).values;
      for (const [key,value] of Object.entries(block.values)) {
        if (value !== defaults[key]) authored.set(block.id+'/'+key, value);
      }
    }
    function read(id, key, fallback = previous.get(id).values[key]) {
      const field = id+'/'+key;
      if (!authored.has(field)) return fallback;
      const value = authored.get(field);
      authored.delete(field);
      return value;
    }
    const values = layout.values(read);
    if (authored.size) continue;
    const primaryId = original[0].id;
    page.blocks = page.blocks.flatMap(block => {
      if (block.id === primaryId) return [{...block, template:layout.template, values}];
      return matched.includes(block) ? [] : [block];
    });
  }
}
