const projects = [
  {
    src: '/assets/images/vivid_uplift/',
    label: 'Vivid Uplift',
    images: 5,
    description: `
      Vivid Uplift is a captivating sculpture that seamlessly blends the vibrant energy of red with the reflective brilliance of polished mirrored steel. This dynamic piece serves as a celebration of the human spirit, encapsulating the essence of unbridled joy and liberation.
      <br><br>

      The sculpture's abstract form takes on the shape of a man in mid-leap, capturing the fleeting moment of pure bliss. The figure's widely opened hands convey a sense of freedom, as if embracing the exhilarating experience of soaring through the air. The choice of red as the dominant color symbolizes passion, vitality, and the intensity of the emotions associated with joy.
      <br><br>

      The polished mirrored steel surfaces not only contribute a sleek and modern aesthetic but also serve a deeper purpose. They reflect the surrounding environment and, by extension, the viewer, creating an interactive and immersive experience. As spectators engage with the sculpture, they find themselves integrated into the narrative, becoming a part of the shared expression of joy.
      <br><br>

      Vivid uplift is an ode to the triumph of the human spirit over adversity, encouraging viewers to embrace moments of happiness and to revel in the simple, yet profound, act of being alive. In its abstract beauty,
      the sculpture transcends language and cultural boundaries, inviting everyone to connect with the universal theme of joy. Whether displayed in a public space or a private setting, Vivid uplift stands as a testament to the uplifting power of art and the human capacity for boundless happiness.
      <br><br>

      Specifications:<br>
      Height: 182cm Width: 205cm<br>
      Thickness: 15cm<br>
      Material: Polished mirrored steel<br>
      Color: Red
    `,
  },
];

const description = `
  Milan is an artist and graphic designer whose inspiration draws from the simplicity and geometric elegance of nature, as well as the clean, contemporary influences of Swiss and Scandinavian design.
  He finds purpose in crafting messages that are both simple and bold, aiming to evoke emotion and resonate on an intuitive level.
  <br><br>
  
  In his early years, Milan first explored his creative side through basketball, finding joy in practicing alone and inventing his own dribbling moves. This early experience allowed him to express himself freely, blending rhythm and imagination. Later, while studying graphic design, he discovered a strong interest in logo and poster design, but he felt there was something more that could fully capture his artistic vision. This realization ultimately led him to sculpture, where he found the freedom to explore form and meaning in new and profound ways.
  <br><br>
  
  Education:<br>
  Academy of arts, graphic design,<br>
  Slobomir P University,<br>
  Bijeljina, Bosnia and Herzegovina
  <br><br>

  Schule fur Gestaltung,<br>
  Study visit,<br>
  Basel, Switzerland
  <br><br>

  Exhibitions:<br>
  Fluid Design Festival Cetinje, Montenegro
  <br><br>

  DVK Festival,<br>
  Split, Croatia
  <br><br>

  Pop up,<br>
  Sarajevo, Bosnia and Herzegovina
  <br><br>

  PDP Conference,<br>
  Novi Sad, Serbia
  <br><br>

  Sketching the journey,<br>
  Balatonszarszo, Hungary
`;

const contact = `
  Contact:<br>
  +387 66 616 293<br>
  info@milankovacevicart.com
  <br><br>

  <a href="https://www.instagram.com/milankovacevicart" target="_blank" class="hover:opacity-80">Instagram</a><br>
`;

document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.getElementById('sidebar');
  const contentContainer = document.getElementById('projects');

  // Function to render sidebar items and add click listeners
  const renderSidebar = () => {
    projectsContainer.innerHTML = ''; // Clear existing content

    // Add project items to sidebar
    projects.forEach((project, index) => {
      const projectItem = document.createElement('p');
      projectItem.classList.add('cursor-pointer', 'hover:text-gray-800');
      projectItem.innerText = project.label;
      projectItem.dataset.index = index; // Store index for hash

      projectItem.addEventListener('click', () => {
        // Update the URL hash
        window.location.hash = `project-${index}`;
        setActiveItem(projectItem);
        displayProjectContent(project);
      });

      projectsContainer.appendChild(projectItem);
    });

    // Add About and Contact items to sidebar
    const aboutItem = createSidebarItem('About', () => {
      window.location.hash = 'about'; // Update the URL hash
      setActiveItem(aboutItem);
      displayPageContent(description);
    });
    const contactItem = createSidebarItem('Contact', () => {
      window.location.hash = 'contact'; // Update the URL hash
      setActiveItem(contactItem);
      displayPageContent(contact);
    });

    projectsContainer.appendChild(aboutItem);
    projectsContainer.appendChild(contactItem);
  };

  // Helper function to create a sidebar item with click functionality
  const createSidebarItem = (label, onClick) => {
    const item = document.createElement('p');
    item.classList.add('cursor-pointer', 'hover:text-gray-800');
    item.innerText = label;
    item.addEventListener('click', onClick);
    return item;
  };

  // Helper function to set active item styling
  const setActiveItem = (activeItem) => {
    document.querySelectorAll('#sidebar p').forEach(item => item.classList.remove('text-gray-600'));
    activeItem.classList.add('text-gray-600');
  };

  // Function to display project content
  const displayProjectContent = (project) => {
    contentContainer.innerHTML = `
      <div>
        <p class="text-lg sm:text-base text-gray-600 w-full md:w-2/3 xl:w-3/5">${project.description}</p>
        <div class="mt-16 grid grid-cols-1 gap-y-4">
          ${Array.from({ length: project.images }, (_, i) => `
            <img src="${project.src}${i + 1}.jpg" alt="${project.label} Image ${i + 1}" class="w-full">
          `).join('')}
        </div>
      </div>
    `;
  };

  // Function to display About or Contact page content
  const displayPageContent = (content) => {
    contentContainer.innerHTML = `
      <div class="w-full md:w-2/3 xl:w-3/5">
        <p class="text-lg sm:text-base text-gray-600">${content}</p>
      </div>
    `;
  };

  // Function to handle hash change and load content accordingly
  const loadContentFromHash = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
      const index = parseInt(hash.split('-')[1], 10);
      if (!isNaN(index) && projects[index]) {
        setActiveItem(document.querySelector(`[data-index="${index}"]`));
        displayProjectContent(projects[index]);
      }
    } else if (hash === '#about') {
      setActiveItem(document.querySelector('#sidebar p:last-child').previousSibling); // About item
      displayPageContent(description);
    } else if (hash === '#contact') {
      setActiveItem(document.querySelector('#sidebar p:last-child')); // Contact item
      displayPageContent(contact);
    } else {
      // Default to the first project if no valid hash
      setActiveItem(document.querySelector('[data-index="0"]'));
      displayProjectContent(projects[0]);
    }
  };

  // Initial render of sidebar and load content based on the hash
  renderSidebar();
  loadContentFromHash();

  // Add event listener for hash change
  window.addEventListener('hashchange', loadContentFromHash);
});

