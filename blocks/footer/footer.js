// import { getMetadata } from '../../scripts/aem.js';
// import { loadFragment } from '../fragment/fragment.js';

// /**
//  * loads and decorates the footer
//  * @param {Element} block The footer block element
//  */
// export default async function decorate(block) {
//   // load footer as fragment
//   const footerMeta = getMetadata('footer');
//   const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
//   const fragment = await loadFragment(footerPath);

//   // decorate footer DOM
//   block.textContent = '';
//   const footer = document.createElement('div');
//   while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

//   block.append(footer);
// }

const footerDetailTitle = {
  'products-and-services': 'PRODUCTS AND SERVICES',
  support: 'SUPPORT',
  'our-company': 'OUR COMPANY',
};

async function fetchFooterData() {
  const response = await fetch('/data/content.json');
  const data = await response.json();
  return data.footer || {};
}

export default async function decorate(block) {
  const footerData = await fetchFooterData();
  const {
    footerTitle,
    footerSubTitle,
    footerButton,
    footerDetails,
  } = footerData;

  block.textCOntent = '';
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';

  const footerSection = document.createElement('section');
  footerSection.className = 'footer-section';
  footerContainer.appendChild(footerSection);

  if (footerTitle && footerSubTitle && footerButton) {
    const footerTitleEl = document.createElement('h3');
    footerTitleEl.className = 'footer-title';
    footerTitleEl.textContent = footerTitle;
    footerSection.appendChild(footerTitleEl);

    const footerSubTitleEl = document.createElement('p');
    footerSubTitleEl.className = 'footer-subtitle';
    footerSubTitleEl.textContent = footerSubTitle;
    footerSection.appendChild(footerSubTitleEl);

    const footerButtonEl = document.createElement('button');
    footerButtonEl.className = 'footer-button';
    footerButtonEl.textContent = footerButton;
    footerButtonEl.addEventListener('click', () => {
      // Handle button click, e.g., navigate to a specific section or perform an action
      console.log('Footer button clicked');
    });
    footerSection.appendChild(footerButtonEl);
  }

  const footerSectionDetails = document.createElement('section');
  footerSectionDetails.className = 'footer-section-details';
  footerContainer.appendChild(footerSectionDetails);

  const footerDetailsContainer = document.createElement('div');
  footerDetailsContainer.className = 'footer-details-container';
  footerSectionDetails.appendChild(footerDetailsContainer);

  if (footerDetails) {
    Object.entries(footerDetails).forEach(([key, value]) => {
      const detailDiv = document.createElement('div');
      detailDiv.className = 'footer-detail';
      const detailTitle = document.createElement('h4');
      detailTitle.className = 'footer-detail-title';
      detailTitle.textContent = footerDetailTitle[key] || key;

      const ul = document.createElement('ul');
      value.forEach((link) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.name;
        a.target = '_blank';
        li.appendChild(a);
        ul.appendChild(li);
      });
      detailDiv.appendChild(detailTitle);
      detailDiv.appendChild(ul);
      footerDetailsContainer.appendChild(detailDiv);
    });
  }
  block.append(footerContainer);
}
