const wincoProducts = {
  dualShades: [
    { category: 'Dual Shades', name: 'Pluto Room Darkening', type: 'Room Darkening', slug: 'pluto-room-darkening', description: 'A dual shade fabric option designed for privacy, softened daylight, and a refined modern finish.', imagePlaceholder: 'Pluto Fabric Image' },
    { category: 'Dual Shades', name: 'Signature Room Darkening', type: 'Room Darkening', slug: 'signature-room-darkening', description: 'A room darkening dual shade collection for comfortable light control in everyday spaces.', imagePlaceholder: 'Signature Fabric Image' },
    { category: 'Dual Shades', name: 'Libra Room Darkening', type: 'Room Darkening', slug: 'libra-room-darkening', description: 'A balanced room darkening option with a clean look for bedrooms, living rooms, and offices.', imagePlaceholder: 'Libra Fabric Image' },
    { category: 'Dual Shades', name: 'Sun Flare Room Darkening', type: 'Room Darkening', slug: 'sun-flare-room-darkening', description: 'A warm room darkening fabric family for privacy and reduced glare.', imagePlaceholder: 'Sun Flare Fabric Image' },
    { category: 'Dual Shades', name: 'Somnia Light Filtering', type: 'Light Filtering', slug: 'somnia-light-filtering', description: 'A light filtering dual shade option that softens daylight while keeping rooms bright.', imagePlaceholder: 'Somnia Fabric Image' },
    { category: 'Dual Shades', name: 'Luna Light Filtering', type: 'Light Filtering', slug: 'luna-light-filtering', description: 'A soft light filtering fabric for calm interiors and flexible daytime privacy.', imagePlaceholder: 'Luna Fabric Image' },
    { category: 'Dual Shades', name: 'Miele Light Filtering', type: 'Light Filtering', slug: 'miele-light-filtering', description: 'A versatile light filtering selection for warm, understated window styling.', imagePlaceholder: 'Miele Fabric Image' },
    { category: 'Dual Shades', name: 'Le Pearl Light Filtering', type: 'Light Filtering', slug: 'le-pearl-light-filtering', description: 'A bright light filtering fabric family with a clean, premium appearance.', imagePlaceholder: 'Le Pearl Fabric Image' },
    { category: 'Dual Shades', name: 'Esparros Light Filtering', type: 'Light Filtering', slug: 'esparros-light-filtering', description: 'A refined light filtering dual shade option for homes and commercial interiors.', imagePlaceholder: 'Esparros Fabric Image' },
    { category: 'Dual Shades', name: 'Comet Light Filtering', type: 'Light Filtering', slug: 'comet-light-filtering', description: 'A simple light filtering fabric for gentle daylight and a minimal profile.', imagePlaceholder: 'Comet Fabric Image' },
    { category: 'Dual Shades', name: '1 Linear Light Filtering', type: 'Light Filtering', slug: '1-linear-light-filtering', description: 'A linear light filtering style for crisp horizontal detail and soft light control.', imagePlaceholder: '1 Linear Fabric Image' },
    { category: 'Dual Shades', name: '7 Linear Light Filtering', type: 'Light Filtering', slug: '7-linear-light-filtering', description: 'A structured light filtering fabric with a subtle linear appearance.', imagePlaceholder: '7 Linear Fabric Image' },
    { category: 'Dual Shades', name: 'Aries Light Filtering', type: 'Light Filtering', slug: 'aries-light-filtering', description: 'A light filtering fabric family suited to everyday residential and office windows.', imagePlaceholder: 'Aries Fabric Image' },
    { category: 'Dual Shades', name: 'Luxury Light Filtering', type: 'Light Filtering', slug: 'luxury-light-filtering', description: 'A premium light filtering option for elegant interiors and softly controlled daylight.', imagePlaceholder: 'Luxury Fabric Image' },
    { category: 'Dual Shades', name: 'Zio Light Filtering', type: 'Light Filtering', slug: 'zio-light-filtering', description: 'A clean light filtering fabric collection for a polished modern finish.', imagePlaceholder: 'Zio Fabric Image' }
  ],
  rollerShades: [
    { category: 'Roller Shades', name: 'Miami Blackout', type: 'Blackout', slug: 'miami-blackout', description: 'A blackout roller shade fabric for privacy, room darkening, and simple modern styling.', imagePlaceholder: 'Miami Fabric Image' },
    { category: 'Roller Shades', name: 'Field Blackout', type: 'Blackout', slug: 'field-blackout', description: 'A practical blackout fabric option for bedrooms, media rooms, and glare control.', imagePlaceholder: 'Field Blackout Fabric Image' },
    { category: 'Roller Shades', name: 'Sky Blackout', type: 'Blackout', slug: 'sky-blackout', description: 'A blackout roller shade collection with a clean look and dependable coverage.', imagePlaceholder: 'Sky Blackout Fabric Image' },
    { category: 'Roller Shades', name: 'NF Blackout', type: 'Blackout', slug: 'nf-blackout', description: 'A minimal blackout fabric family for privacy-focused window covering projects.', imagePlaceholder: 'NF Fabric Image' },
    { category: 'Roller Shades', name: 'JA Blackout', type: 'Blackout', slug: 'ja-blackout', description: 'A blackout roller shade option for crisp interiors and controlled light.', imagePlaceholder: 'JA Fabric Image' },
    { category: 'Roller Shades', name: 'Field Light Filtering', type: 'Light Filtering', slug: 'field-light-filtering', description: 'A light filtering roller fabric for softened daylight and comfortable privacy.', imagePlaceholder: 'Field Light Filtering Fabric Image' },
    { category: 'Roller Shades', name: 'Sky Light Filtering', type: 'Light Filtering', slug: 'sky-light-filtering', description: 'A bright light filtering selection for open, calm, and functional rooms.', imagePlaceholder: 'Sky Light Filtering Fabric Image' },
    { category: 'Roller Shades', name: 'Sunscreen 1%', type: 'Sunscreen', slug: 'sunscreen-1', description: 'A low openness sunscreen fabric for stronger glare reduction and daytime view control.', imagePlaceholder: 'Sunscreen 1% Fabric Image' },
    { category: 'Roller Shades', name: 'Sunscreen 3%', type: 'Sunscreen', slug: 'sunscreen-3', description: 'A sunscreen roller shade fabric that balances glare control with outward visibility.', imagePlaceholder: 'Sunscreen 3% Fabric Image' },
    { category: 'Roller Shades', name: 'TC Light Filtering', type: 'Light Filtering', slug: 'tc-light-filtering', description: 'A versatile light filtering fabric for simple, durable roller shade projects.', imagePlaceholder: 'TC Fabric Image' }
  ]
};

function renderProductGrid(grid) {
  const group = grid.dataset.productGrid;
  const products = group === 'dual' ? wincoProducts.dualShades : wincoProducts.rollerShades;

  grid.innerHTML = products.map((product) => `
    <article class="catalog-product-card" id="${product.slug}">
      <div class="image-placeholder catalog-product-image-placeholder ${product.slug}-placeholder">
        <span>${product.imagePlaceholder}</span>
      </div>
      <div class="catalog-product-body">
        <div class="product-badge">${product.type}</div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <a href="#${product.slug}">Learn More</a>
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-product-grid]').forEach(renderProductGrid);
});
