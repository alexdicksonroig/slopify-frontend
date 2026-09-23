import {
  Accordion,
  Button,
  Card,
  Dialog,
  Drawer,
  Icon,
  Input,
  Label,
  LoadingCircle,
  Overlay,
  Popover,
  Select,
  Separator,
  Skeleton,
  Table,
} from "@library";
import { type ReactNode, useId, useState } from "react";
import {
  sizes,
  variants,
} from "../../../packages/coreui/src/packages/components/button";
import { ICON_NAMES } from "../../../packages/coreui/src/packages/components/icon.types";

export function meta() {
  return [{ title: "CoreUI component gallery" }];
}

function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border bg-card p-5 sm:p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function CoreUIGallery() {
  const id = useId();
  const [selection, setSelection] = useState("medium");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const options = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-4">
      <div className="mx-auto w-full space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            Development only
          </p>
          <h1 className="text-4xl font-semibold">CoreUI component gallery</h1>
          <p className="text-muted-foreground">
            All 15 UI components, with interactive examples and common states.
          </p>
          <a className="inline-block underline underline-offset-4" href="/">
            Back to the store
          </a>
        </header>

        <Example title="Button">
          <div className="flex flex-wrap items-center gap-3">
            {Object.keys(variants).map((variant) => (
              <Button
                key={variant}
                type="button"
                variant={variant as keyof typeof variants}
              >
                {variant}
              </Button>
            ))}
            <Button type="button" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {Object.keys(sizes).map((size) => (
              <Button
                key={size}
                type="button"
                size={size as keyof typeof sizes}
                aria-label={size === "icon" ? "Add item" : undefined}
              >
                {size === "icon" ? (
                  <Icon icon="plus" className="invert" />
                ) : (
                  size
                )}
              </Button>
            ))}
          </div>
        </Example>

        <div className="grid gap-6 md:grid-cols-2">
          <Example title="Input & Label">
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Name</Label>
              <Input id={`${id}-name`} placeholder="Enter a name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                type="email"
                defaultValue="hello@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-disabled`}>Disabled input</Label>
              <Input
                id={`${id}-disabled`}
                disabled
                defaultValue="Read only preview"
              />
            </div>
          </Example>

          <Example title="Select">
            <p id={`${id}-select-label`}>Choose a size</p>
            <Select
              aria-labelledby={`${id}-select-label`}
              options={options}
              value={selection}
              onChange={setSelection}
            />
            <p className="text-sm text-muted-foreground">
              Selected value: {selection}
            </p>
            <Select
              aria-label="Unselected size"
              options={options}
              placeholder="Choose an option"
              onChange={setSelection}
            />
            <Select
              aria-label="Disabled size"
              options={options}
              value="medium"
              disabled
            />
          </Example>

          <Example title="Card">
            <Card>
              <Card.Header>
                <Card.Title>Example card</Card.Title>
                <Card.Description>
                  A description in the card header.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                Content can include text, forms, or other components.
              </Card.Content>
              <Card.Footer>
                <Button type="button" variant="secondary">
                  Card action
                </Button>
              </Card.Footer>
            </Card>
          </Example>

          <Example title="Accordion">
            <Accordion defaultOpenItems>
              <Accordion.Item itemId="overview" headerText="Open by default">
                An expanded item with content.
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item itemId="details" headerText="Toggle details">
                Click the heading again to collapse this item.
              </Accordion.Item>
              <Accordion.Item itemId="more" headerText="More information">
                Each item can be expanded independently.
              </Accordion.Item>
            </Accordion>
          </Example>
        </div>

        <Example title="Table">
          <Table>
            <Table.Caption>
              A sample order using all table subcomponents.
            </Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head scope="col">Item</Table.Head>
                <Table.Head scope="col">Quantity</Table.Head>
                <Table.Head scope="col">Price</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Notebook</Table.Cell>
                <Table.Cell>2</Table.Cell>
                <Table.Cell>€12.00</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Pencil</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>€3.00</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={2}>Total</Table.Cell>
                <Table.Cell>€15.00</Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Example>

        <Example title="Icon">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {ICON_NAMES.map((icon) => (
              <div
                key={icon}
                className="flex flex-col items-center gap-3 rounded-md border p-3"
              >
                <Icon icon={icon} size="lg" />
                <span className="text-center text-xs">{icon}</span>
              </div>
            ))}
          </div>
        </Example>

        <div className="grid gap-6 md:grid-cols-2">
          <Example title="LoadingCircle">
            <div className="flex items-center gap-6">
              {(["sm", "md", "lg"] as const).map((size) => (
                <div key={size} className="flex items-center gap-2">
                  <LoadingCircle size={size} label={`Loading (${size})`} />
                  <span>{size}</span>
                </div>
              ))}
            </div>
          </Example>
          <Example title="Skeleton">
            <div className="flex items-center gap-4">
              <Skeleton className="size-14 shrink-0" />
              <div className="w-full space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </Example>
          <Example title="Separator">
            <p>Horizontal separator</p>
            <Separator />
            <div className="flex h-8 items-center gap-4">
              <span>Left</span>
              <Separator orientation="vertical" />
              <span>Right</span>
            </div>
          </Example>
          <Example title="Popover">
            <div className="relative w-fit">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPopoverOpen(!popoverOpen)}
                aria-expanded={popoverOpen}
              >
                Toggle popover
              </Button>
              <Popover
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
                placement="bottom"
                className="inset-x-0 rounded-lg border bg-popover p-5 shadow-md md:w-72"
              >
                <p className="mb-4">
                  Anchored on desktop; a bottom panel on mobile.
                </p>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setPopoverOpen(false)}
                >
                  Close popover
                </Button>
              </Popover>
            </div>
          </Example>
          <Example title="Dialog">
            <Button type="button" onClick={() => setDialogOpen(true)}>
              Open dialog
            </Button>
            <Dialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              isModal={false}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-dialog-title`}
              className="gap-4 p-6"
            >
              <h2 id={`${id}-dialog-title`} className="text-xl font-semibold">
                Example dialog
              </h2>
              <p>Close with the button or click outside the dialog.</p>
              <Button type="button" onClick={() => setDialogOpen(false)}>
                Close dialog
              </Button>
            </Dialog>
          </Example>
          <Example title="Drawer">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDrawerOpen(true)}
            >
              Open drawer
            </Button>
            <Overlay
              active={drawerOpen}
              onClick={() => setDrawerOpen(false)}
              className="md:bg-black/15"
            />
            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              fromRight
              hiddenFrom={false}
              className="max-w-sm"
              contentClassName="p-6"
            >
              <h2 className="mb-4 text-xl font-semibold">Example drawer</h2>
              <p className="mb-6">
                A right-hand drawer available at every screen size.
              </p>
              <Button type="button" onClick={() => setDrawerOpen(false)}>
                Close drawer
              </Button>
            </Drawer>
          </Example>
          <Example title="Overlay">
            <p>Click the backdrop to dismiss the overlay.</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOverlayOpen(true)}
            >
              Show overlay
            </Button>
            <Overlay
              active={overlayOpen}
              onClick={() => setOverlayOpen(false)}
              className="md:bg-black/15"
            />
          </Example>
        </div>
      </div>
    </main>
  );
}
