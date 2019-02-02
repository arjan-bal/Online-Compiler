import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

declare var JSEncrypt: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  code = "";
  inputs = "";

  isError = false;
  title = "";
  result = "";

  encryptedCode = "";

  constructor(private api: ApiService) { }



  ngOnInit() { }

  submit() {
    var crypt = new JSEncrypt();

    var publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnAQMQ1nLI4Gf941phu8G
74AuGZDmKSVKFU8/1+f75v5jP/JISV+xxhWe/a2KXdvIJTt8CtVFfE4L7E5P9MVF
9HIfmm3O6H3PZpyx/dnGfcA3KuC6ODMahMHi91HDL91DxWFHtvvB7XVkR6HrJqA/
xz9aIiEdxJESsMIfbex5NeuyO3oChKRnshIAdLbrYznYQivgfmHF1oQbSF8kQfCa
2aLMojDT85mOl5ABHAJxim3G5rJrVjKZDCDe2jBWho3pA8JjJDW8AcsglUTfTTqO
2hdVn5IoUSpXKzwBZAUIklPYU6Maza4pyHPCeqJb28LOotK1U8cJLO7JBtxFBhVt
r1KVneApox4isGvzidOkrhIB14qC/B1DJ/M9C73cGw9ip1ZzqlTHwfaqO+T+myG6
uY08fLLLdhIaOT+D2cP+WeFIif6yKuZzaPX/iAblRDVwzON+gWTq5W6v0TaqrMmC
F+QlJkbniD260Yh7NVtGBW2sweVGqOlfmC5pmhWQ5h/6FINo8HNEwUGgOHlZilr0
lew3UkMlRmGSraDVeoxhAOkDTkLd5iuBoRNFA5Mzvwvr4Hl2vDXGcIePJKcA24z5
xTXMuuyUT4UtZcOkzDl+9QlTN5nyKa4u7kpx1tVL0p3deXVW6tYOQNQqr8Sd50Ft
z5CJ3eg39Xeq2kCiLevtdh8CAwEAAQ==
-----END PUBLIC KEY-----`;

    crypt.setKey(publicKey);
    this.encryptedCode = crypt.encrypt(this.code);

    this.api.run(this.encryptedCode, this.inputs).subscribe((data: any) => {
      this.isError = !data.success;
      this.title = data.title;
      this.result = this.isError ? data.errors : data.output;
    });
  }
}
