import { Footer } from "antd/es/layout/layout";

export const FooterComponent: React.FunctionComponent = () => {
  return (
    <Footer className="px-18">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
        <div className="flex order-2 md:order-1  gap-2 font-normal text-sm">
          <span className="text-muted-foreground">2025 &copy;</span>
          <a
            target="_blank"
            className="text-secondary-foreground hover:text-primary"
          >
            LongNguyen React Vjp Pr0 M4x.
          </a>
        </div>
        <nav className="flex order-1 md:order-2 gap-4 font-normal text-sm text-muted-foreground">
          <a href="/" target="_blank" className="hover:text-primary">
            Docs
          </a>
          <a href="/" target="_blank" className="hover:text-primary">
            Purchase
          </a>
          <a href="/" target="_blank" className="hover:text-primary">
            FAQ
          </a>
          <a href="/" target="_blank" className="hover:text-primary">
            Support
          </a>
          <a href="/" target="_blank" className="hover:text-primary">
            License
          </a>
        </nav>
      </div>
    </Footer>
  );
};

export default FooterComponent;
