require 'sinatra/base'
require 'webrick'
require 'webrick/https'
require 'openssl'

class Plot3DDevServer  < Sinatra::Base
    get '/' do
      
    end            
end

CERT_PATH = '/home/etk66296/myCA/'

webrick_options = {
  :Port               => 9999,
  :Logger             => WEBrick::Log::new($stderr, WEBrick::Log::DEBUG),
  :DocumentRoot       => '',
  :SSLEnable          => true,
  :SSLVerifyClient    => OpenSSL::SSL::VERIFY_NONE,
  :SSLCertificate     => OpenSSL::X509::Certificate.new(  File.open(File.join(CERT_PATH, "server_crt.pem")).read),
  :SSLPrivateKey      => OpenSSL::PKey::RSA.new(          File.open(File.join(CERT_PATH, "server_key.pem")).read),
  :SSLCertName        => [ [ "CN",WEBrick::Utils::getservername ] ],
  :app                => Plot3DDevServer
}

Rack::Server.start webrick_options
