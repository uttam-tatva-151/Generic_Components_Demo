import { GenericCardConfig } from "generic-components-angular";

const DEMO_IMG_URL: string = "https://placehold.co/400x200?text=Expanded+Card+Image";

export const primaryCardDemoConfig: GenericCardConfig = (() => {
  // Safe initialization of all nested objects
  const config: GenericCardConfig = {
    metaData: {
      id: 'primary-demo-001',
      name: 'Primary Card Demo',
      ariaLabel: 'Primary Card Interactive Demo',
      role: 'region',
      overlays: [],
      loader: { show: false, type: 'spinner' },
      errorHandler: { hasError: false },
    },
    theme: {
      customClass: 'primary-card-modern',
      style: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        borderRadius: '1.5rem',
        padding: '0',
      },
      primaryColor: '#1976d2',
      secondaryColor: '#ffffff',
      textColor: '#212121',
      borderColor: 'rgba(25,118,210,0.18)',
      borderWidth: '1px',
    },
    structure: {
      layout: 'vertical',
      position: 'relative',
      grid: {
        columns: 1,
        rowGap: '1.5rem',
        columnGap: '1.5rem',
      },
      responsiveness: {
        breakpoints: {
          sm: { layout: 'stacked', customClass: 'primary-card-sm' },
          md: { layout: 'vertical', customClass: 'primary-card-md' },
          lg: { layout: 'horizontal', customClass: 'primary-card-lg' },
        },
        minWidth: '220px',
        maxWidth: '650px',
      },
      slots: {
        header: {
          content: {
            type: 'text',
            label: 'Primary Card Demo',
            data: 'Experience all main features',
            animation: { classes: 'fade-in' }
          },
          theme: { customClass: 'primary-card-header' }
        },
        body: {
          content: {
            type: 'list',
            label: 'Demo Features',
            data: [
              'Expandable section',
              'Selectable card',
              'Draggable',
              'Responsive layout',
              'Custom themes'
            ],
            animation: { classes: 'slide-in' }
          },
          theme: { customClass: 'primary-card-body' }
        },
        footer: {
          content: {
            type: 'text',
            label: 'Actions:',
            data: 'Expand, Select, Drag this card!',
            animation: { classes: 'fade-in' }
          },
          theme: { customClass: 'primary-card-footer'}
        }
      },
      customClass: 'primary-card-modern',
    },
    behaviour: {
      expandable: true,
      expanded: false,
      selectable: true,
      selected: false,
      draggable: true,
      events: {
        onExpand: () => {
          config.behaviour!.expanded = true;
          // Safely update slots.body.content to show image
          if (
            config.structure &&
            config.structure.slots &&
            config.structure.slots.body
          ) {
            config.structure.slots.body.content = {
              type: 'image',
              label: 'Expanded Image',
              mediaMeta:{
                src: DEMO_IMG_URL,
                type: 'image',
                size: 'cover',
                alt: 'Expanded Image'
              },
              animation: { classes: 'fade-in' }
            };
          }
        },
        onCollapse: () => {
          config.behaviour!.expanded = false;
          // Safely revert to original list
          if (
            config.structure &&
            config.structure.slots &&
            config.structure.slots.body
          ) {
            config.structure.slots.body.content = {
              type: 'list',
              label: 'Demo Features',
              data: [
                'Expandable section',
                'Selectable card',
                'Draggable',
                'Responsive layout',
                'Custom themes'
              ],
              animation: { classes: 'slide-in' }
            };
          }
        },
        onSelect: () => {
          config.behaviour!.selected = true;
        },
        onDeselect: () => {
          config.behaviour!.selected = false;
        },
        onDragStart: () => {
          config.behaviour!.draggable = true;
        },
        onDragEnd: () => {
          config.behaviour!.draggable = false;
        },
      },
    },
    content: {},
  };

  return config;
})();