from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
from urllib.parse import urlsplit
import os

class AutoMapHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Redirect all paths to ./docs directory
        original_path = super().translate_path(path)
        rel_path = os.path.relpath(original_path, os.getcwd())
        docs_path = os.path.join(os.getcwd(), 'docs', rel_path)
        return docs_path

    def do_GET(self):
        parsed = urlsplit(self.path)
        clean_path = parsed.path
        
        # Check if path exists as-is
        full_path = self.translate_path(clean_path)
        if not os.path.exists(full_path):
            # Try appending .html
            new_path = f"{clean_path}.html"
            if os.path.isfile(self.translate_path(new_path)):
                self.path = new_path + ('?' + parsed.query if parsed.query else '') + \
                            ('#' + parsed.fragment if parsed.fragment else '')
        
        super().do_GET()

PORT = 3000
with TCPServer(("", PORT), AutoMapHandler) as httpd:
    print(f"Serving ./docs directory at http://localhost:{PORT}")
    print("URLs without extensions will automatically try .html files")
    httpd.serve_forever()
